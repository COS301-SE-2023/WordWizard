class Phonotactic:
    finalRating = 0
    def __init__(self, pattern: str):
        self.pattern = pattern
        self.weight = 1.1
    def add(self, weight: float=1):
        self.weight += weight