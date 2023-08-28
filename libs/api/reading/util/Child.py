class Child:
    def __init__(self, metrics, gameLevel: int, readingAbility : float=1):
        self.metrics = metrics
        self.readingAbility = readingAbility
        self.gameLevel = gameLevel
    def calReadingAbility(self):
        for s in self.metrics.syllables:
            temp = s.numberOf * s.weight
        self.readingAbility = temp