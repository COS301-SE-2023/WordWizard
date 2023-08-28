from fastapi import APIRouter
from ..util.child_models import GetChildrenReq, EditChildReq, DeleteChildReq, GetPreferencesReq, UpdatePreferencesReq
from dataclasses import dataclass
from bson import ObjectId
from ...deps import Database

db = Database.getInstance().db
router = APIRouter()

@router.post('/')
def get_children(rqst: GetChildrenReq):
    parent_data = {
        'username': rqst.parent_name,
        'email': rqst.parent_email,
        'children': []
    }
    parents_collection = db['Parents']
    existing_parent = parents_collection.find_one({'email': parent_data['email']})
    if existing_parent:
        children = []
        for id in existing_parent['children']:
            children.append(get_child(id))
        return children
    else:
        result_parent = parents_collection.insert_one(parent_data)
        return []
    
@router.post('/get-preferences')
def get_preferences(rqst: GetPreferencesReq):
    preferences = db['Children'].find_one({'_id': ObjectId(rqst.child_id)})
    print(preferences)
    if(preferences["preferences"]):
        return preferences["preferences"]
    else:
        db['Children'].update_one(
            {'_id': ObjectId(rqst.child_id)},
            {'$set': {'preferences': []}}
        )
        return []

@router.post('/update-preferences')
def update_preferences(rqst: UpdatePreferencesReq):
    db['Children'].update_one(
        {'_id': ObjectId(rqst.child_id)},
        {'$set': {
            'preferences': rqst.preferences
        }}
    )
    return { 'status': 'success' }

def get_child(child_id):
    children_collection = db['Children']
    child = children_collection.find_one({'_id': child_id})
    if child:
        child['_id'] = str(child['_id'])
        child['parent'] = str(child['parent'])
        return child
    else:
        return None
    

@router.post('/edit-child')
def edit(rqst: EditChildReq):
    if (rqst.child_id == ''):
        return { 'status': 'error', 'message': 'No Child id' }
    children_collection = db['Children']
    object_id = ObjectId(rqst.child_id)
    existing_child = children_collection.find_one({'_id': object_id})
    if existing_child:
        children_collection.update_one(
            {'_id': object_id},
            {'$set': {
                'username': rqst.name,
                'age': rqst.age,
                'profile_photo': rqst.profile_picture,
            }}
        )
        return { 'status': 'success' }
    else:
        return { 'status': 'error', 'message': 'Child not found' }
    


@router.post('/delete-child')
def delete(rqst: DeleteChildReq):
    if rqst.child_id == '':
        return {'status': 'error', 'message': 'No Child id'}
    object_id = ObjectId(rqst.child_id)
    existing_child = db['Children'].find_one({'_id': object_id})
    if existing_child:
        db['Children'].delete_one({'_id': object_id})
        db['Vocabulary'].delete_one({'_id': object_id})
        db['Practice'].delete_one({'_id': object_id})

        db['Parents'].update_one(
            {'_id': ObjectId(existing_child['parent'])},
            {'$pull': {'children': object_id}}
        )
        return {'status': 'success'}
    else:
        return {'status': 'error', 'message': 'Child not found'}