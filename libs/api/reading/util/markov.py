import random
from ...deps import Database
db = Database.getInstance().db

class MarkovChain:
    def __init__(self):
        self.transitions = {}
        self.populate_from_db(db['markov'])

    def add_transition(self, from_state, to_state):
        if from_state not in self.transitions:
            self.transitions[from_state] = []
        self.transitions[from_state].append(to_state)
    
    def populate_from_db(self, collection):
        for doc in collection.find():
            self.add_transition(doc["state"], doc["next_state"])

    def generate_passage(self, length, start_state=None, priority_words=None):
        if not self.transitions:
            raise ValueError("No transitions defined")
        if start_state is None:
            start_state = random.choice(list(self.transitions.keys()))
        passage = [start_state]
        current_state = start_state
        for _ in range(length - 1):
            next_states = self.transitions.get(current_state, [])
            if priority_words:
                priority_states = [state for state in next_states if state in priority_words]
                if priority_states:
                    next_state = random.choice(priority_states)
                    priority_words.remove(next_state)
                else:
                    next_state = random.choice(next_states)
            else:
                next_state = random.choice(next_states)
            passage.append(next_state)
            current_state = next_state
        return " ".join(passage)