from .helper import count_syllables, find_phonotactics, get_prefixes_suffixes, get_phonotactic, get_prefix, get_suffix
from .Syllable import Syllable
from .Phonotactic import Phonotactic
from .Prefix import Prefix
from .Suffix import Suffix
from .Metrics import Metrics
from .Child import Child

class Rating:
    def __init__(self, vcb, prtc, pref: list[str] = []):
        self.vcb = vcb
        self.prtc = prtc
        self.pref = pref
        self.construct_dic()
        self.metrices = Metrics(self.syllables, self.phono_arr, self.prefixes, self.suffixes)
        self.child = Child(self.metrices, 10)
        self.fit()

    def fit(self):
        for w in self.prtc:
            if isinstance(w, str):
                pref,suff = get_prefixes_suffixes(w)
                self.phono_dic[find_phonotactics(w)].add(-1)
                self.syllables[count_syllables(w)-1].add(-1)
                if pref:
                    self.prefixes[len(pref)].add(-1)
                if suff:
                    self.suffixes[len(suff)].add(-1)
            else:
                self.phono_dic[w['phonotactics']].add(-1)
                self.syllables[w['syllables']-1].add(-1)
                if w['prefixes']:
                    self.prefixes[len(w['prefixes'])-1].add(-1)
                if w['suffixes']:
                    self.suffixes[len(w['suffixes'])-1].add(-1)

        for w in self.vcb:
            if isinstance(w, str):
                pref,suff = get_prefixes_suffixes(w)
                self.phono_dic[find_phonotactics(w)].add()
                self.syllables[count_syllables(w)-1].add()
                if pref and len(pref) < 5:
                    self.prefixes[len(pref)-1].add(-1)
                if suff and len(suff) < 5:
                    self.suffixes[len(suff)-1].add(-1)
            else:
                self.phono_dic[w['phonotactics']].add()
                self.syllables[w['syllables']-1].add()
                print(w['prefixes'])
                print(w['suffixes'])
                if w['prefixes'] and len(w['prefixes']) < 5:
                    self.prefixes[len(w['prefixes'])-1].add(-1)
                if w['suffixes'] and len(w['suffixes']) < 5:
                    self.suffixes[len(w['suffixes'])-1].add(-1)

    def construct_dic(self):
        self.syllables = []
        self.prefixes = []
        self.suffixes = []
        for i in range(1,6):
            self.syllables.append(Syllable(i, (len(self.vcb) + len(self.prtc))/2))
        for i in range(1,5):
            self.prefixes.append(Prefix(i))
            self.suffixes.append(Suffix(i))
        self.phono_dic = {
            "CV": Phonotactic("CV"),
            "CVC": Phonotactic("CVC"),
            "CCV": Phonotactic("CCV"),
            "CVCC": Phonotactic("CVCC"),
            "CCCV": Phonotactic("CCCV"),
            "CCVC": Phonotactic("CCVC"),
            "V": Phonotactic("V"),
            "VC": Phonotactic("VC")
        }
        self.phono_arr = []
        for p in self.phono_dic:
            self.phono_arr.append(self.phono_dic[p])

    def evaluatePhonotactics(self):
        phonotactics = self.child.metrics.phonotactics
        for phonotactic in phonotactics:
            phonotactic.finalRating = (self.child.gameLevel * (4 - get_phonotactic(phonotactic.pattern))) / (self.child.readingAbility * get_phonotactic(phonotactic.pattern) * phonotactic.weight)
        return max(phonotactics, key=lambda x: x.finalRating)

    def evaluateSyllables(self):
        syllables = self.child.metrics.syllables
        for syllable in syllables:
            syllable.finalRating = (self.child.gameLevel * (5-syllable.numberOf)) / (self.child.readingAbility * (syllable.numberOf) * syllable.weight)
        return max(syllables, key=lambda x: x.finalRating)

    def evaluatePrefixes(self):
        prefixes = self.child.metrics.prefixes
        for prefix in prefixes:
            prefix.finalRating = (self.child.gameLevel * (4-prefix.length)) / (self.child.readingAbility * (prefix.length) * prefix.weight)
        return max(prefixes, key=lambda x: x.finalRating)
        
    def evaluateSuffixes(self):
        suffixes = self.child.metrics.suffixes
        for suffix in suffixes:
            suffix.finalRating = (self.child.gameLevel * (4-suffix.length)) / (self.child.readingAbility * (suffix.length) * suffix.weight)
        return max(suffixes, key=lambda x: x.finalRating)
    
    def generatePrompt(self):
        return f"""
You are a sentence generator, you need to generate a sentence that a child will read to practice reading and pronunciation, each sentence will contain 2 'focus words' that the child will practice before attempting the entire sentence as a hole.
Let's say there is some function 'G' that is the sentence generator.
The generator takes in the following paramaters;
THEME, COM, LEN, SYL, PHONA, PRE, SUF
Here is a breakdown of each paramter:
THEME : The theme the sentence is based on,
COM : The complexity(Difficulty) level of the sentence from 1 to 10(1 being a very simple and easy sentence and 10 being extremely complicated)
LEN : The number of words in the sentence,
SYL : At least one of the 'focus words' that is generated should have so many syllables,
PHONA : At least one of the 'focus words' that is generated should consist of the provided phonotactic pattern,
PRE : At least one of the 'focus words'should contain the prefix,
SUF : At least one of the 'focus words'should contain the suffix

NOTE: if such a sentence is not possible the order of precedence the paramaters should take is THEME, COM, LEN, SYL, PHONA, PRE, SUF

Now evaluate the following function, {self.get_function()}

Your response should be in the follow format:

Sentence: ...
Focus Words: ...
        """
    def __str__(self) -> str:
        return self.generatePrompt()
    def get_function(self):
        return f"G(THEME={self.pref},COM=4, LEN=5 , SYL={self.evaluateSyllables().numberOf}, PHONA='{self.evaluatePhonotactics().pattern}', PRE='{get_prefix(self.evaluatePrefixes().length)}', SUF='{get_suffix(self.evaluateSuffixes().length)}')"