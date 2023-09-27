from .Syllable import Syllable
from .Phonotactic import Phonotactic
from .Prefix import Prefix
from .Suffix import Suffix


class Metrics:
    def __init__(
        self,
        syllables: list[Syllable],
        phonotactics: list[Phonotactic],
        prefixes: list[Prefix],
        suffixes: list[Suffix],
    ):
        self.syllables = syllables
        self.phonotactics = phonotactics
        self.prefixes = prefixes
        self.suffixes = suffixes

    def cal_syl(self) -> float:
        avg = 0
        for s in self.syllables:
            avg += s.calculate()
        return round(avg, 2)

    def cal_phono(self) -> float:
        avg = 0
        for s in self.phonotactics:
            avg += s.calculate()
        return avg

    def cal_pref(self) -> float:
        avg = 0
        for s in self.prefixes:
            avg += s.calculate()
        return avg

    def cal_suff(self) -> float:
        avg = 0
        for s in self.suffixes:
            avg += s.calculate()
        return avg
