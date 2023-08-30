class Suffix:
    finalRating=0
    def __init__(self, length: int):
        self.length = length
        self.weight = 0.1
    def add(self, weight: float=1):
        self.weight += weight