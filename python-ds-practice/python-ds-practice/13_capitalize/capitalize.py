def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """

    cap = phrase[0].upper()

    phrase = phrase[1:]

    phrase = cap + phrase

    return phrase