class Syllable:
    finalRating = 0
    def __init__(self, numberOf: int, avg: float):
        self.numberOf = numberOf
        self.weight = 0.1
        self.avg = avg
    def add(self, weight: float=1):
            self.weight += weight
    def calculate(self):
        return self.weight/self.avg