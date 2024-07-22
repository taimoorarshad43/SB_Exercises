from random import randint
"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    """Class that takes words and returns them at random"""

    def __init__(self, path):
        file = open(path, "r")

        self.getwords(file) # Thats an interesting syntax to use for helper functions.

        print(f"{len(self.words)} words read")

    def random(self):
        """Gets a random word from the WordFinder object"""
        rand = randint(0, len(self.words)-1)
        return self.words[rand]
    
    def getwords(self, file):
        self.words = []

        for line in file:
            newline = line.strip()
            self.words.append(newline)

        return self.words
        