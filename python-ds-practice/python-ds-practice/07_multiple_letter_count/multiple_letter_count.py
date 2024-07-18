def multiple_letter_count(phrase):
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """

    bag = {}

    for letter in phrase:
        if letter not in bag:
            bag[letter] = 1
        else:
            bag[letter] = bag.get(letter) + 1
    
    return bag