from random import randint
from wordfinder import WordFinder
"""Word Finder: finds random words from a dictionary."""


class SpecialWordFinder(WordFinder):
    """Class that takes words and returns them at random"""

    def __init__(self, path):
        super().__init__(path)

    def random(self):
        """Gets a random word from the WordFinder object"""
        return super().random() # This return statement is important.

    def getwords(self, file):

        self.words = []

        for line in file:
            if line[0] == '#' or line[0] == '' or line[:1] == '\n':
                continue
            else:
                newline = line.strip()
                self.words.append(newline)

# Made a function that overrides WordFinder's getwords() func. When calling super() does it reference the old or new function?
# Apparently yes, this works as intended.