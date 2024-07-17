def print_upper_words(words, must_start_with = {}):
    for word in words:
        for char in must_start_with:
            if word[0] == char:
                print(f"{word.upper()}\n")


print_upper_words(["hello", "hey", "goodbye", "yo", "yes"], must_start_with={"h","y"})