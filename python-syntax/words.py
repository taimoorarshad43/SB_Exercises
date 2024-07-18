def print_upper_words(words, must_start_with = {}):

    '''This function takes a list of words and returns them line by line in upper case
        A second arguement specifies to only return words that start with specific characters
        '''

    for word in words:
        for char in must_start_with:
            if word[0] == char:
                print(f"{word.upper()}\n")


print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h","y"})