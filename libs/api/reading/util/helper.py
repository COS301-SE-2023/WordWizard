import re
import csv
import os
import random
from ...deps import Database
db = Database.getInstance().db

patterns = {
    r'[bcdfghjklmnpqrstvwxyz][aeiou]': 'CV',
    r'[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]': 'CVC',
    r'[bcdfghjklmnpqrstvwxyz][bcdfghjklmnpqrstvwxyz][aeiou]': 'CCV',
    r'[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz][bcdfghjklmnpqrstvwxyz]': 'CVCC',
    r'[bcdfghjklmnpqrstvwxyz]{3}[aeiou]': 'CCCV',
    r'[bcdfghjklmnpqrstvwxyz]{2}[aeiou][bcdfghjklmnpqrstvwxyz]': 'CCVC',
    r'[aeiou]': 'V',
    r'[aeiou][bcdfghjklmnpqrstvwxyz]': 'VC'
}

def count_syllables(word):
    cv_pattern = r'[bcdfghjklmnpqrstvwxz]+[aeiouy]+'
    cvs = re.findall(cv_pattern, word)
    return len(cvs)

def find_phonotactics(word):
    longest_pattern = None
    for pattern, phonotactic in patterns.items():
        match = re.search(pattern, word)
        if match and (longest_pattern is None or len(match.group()) > len(longest_pattern)):
            longest_pattern = phonotactic
    if longest_pattern:
        return longest_pattern
    return None

def get_prefixes_suffixes(word):
    prefixes = ['a', 'anti', 'bi', 'co', 'com', 'de', 'dis', 'en', 'em', 'ex', 'extra', 'fore', 'in', 'im', 'il', 'ir', 'inter', 'intra', 'mis', 'non', 'over', 'pre', 'pro', 're', 'semi', 'sub', 'super', 'trans', 'tri', 'un', 'under']
    suffixes = ['able', 'al', 'ed', 'en', 'er', 'est', 'ful', 'ic', 'ing', 'ion', 'ity', 'ive', 'less', 'ly', 'ment', 'ness', 'ous', 's', 'tion', 'y']
    prefix = None
    suffix = None
    for p in prefixes:
        if word.startswith(p):
            suffix = p
            break
    for s in suffixes:
        if word.endswith(s):
            prefix = s
            break
    return prefix, suffix

def create(data):
    fieldnames = ["word", "phonotactics", "prefixes", "suffixes", "syllables", "level"]
    with open(os.path.join(os.path.dirname(__file__), "data.csv"), "w", newline="") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            if isinstance(row, str):
                pref, suff = get_prefixes_suffixes(row)
                writer.writerow({
                    'word': row,
                    'phonotactics': find_phonotactics(row),
                    'prefixes': pref,
                    'suffixes': suff,
                    'syllables': count_syllables(row),
                    'level':random.randint(0, 21) 
                })
            else:
                writer.writerow(row)

def load():
    words_collection = db["Practice"]
    all_documents = words_collection.find({}, {"_id": 0})
    arr = []
    for document in all_documents:
        arr.append(document["words"])
    arr = [item for sublist in arr for item in sublist]
    create(arr)

def delete():
    if os.path.exists(os.path.join(os.path.dirname(__file__), "data.csv")):
        os.remove(os.path.join(os.path.dirname(__file__), "data.csv"))
    else:
        print("The file does not exist")

prefixes = ['a', 'anti', 'bi', 'co', 'com', 'de', 'dis', 'en', 'em', 'ex', 'fore', 'in', 'im', 'il', 'ir', 'mis', 'non', 'over', 'pre', 'pro', 're', 'semi', 'sub', 'tri', 'un']
suffixes = ['able', 'al', 'ed', 'en', 'er', 'est', 'ful', 'ic', 'ing', 'ion', 'ity', 'ive', 'less', 'ly', 'ment', 'ness', 'ous', 's', 'tion', 'y']

def get_prefix(length: int) -> str:
    return random.choice([prefix for prefix in prefixes if len(prefix) == length])

def get_suffix(length: int) -> str:
    return random.choice([suffix for suffix in suffixes if len(suffix) == length])

p = {
    'CV': 2,
    'CVC': 3,
    'CCV': 3,
    'CVCC': 4,
    'CCCV': 4,
    'CCVC': 4,
    'V': 1,
    'VC': 2
}
def get_phonotactic(pattern: str):
    return p[pattern]