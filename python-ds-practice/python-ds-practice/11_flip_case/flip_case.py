def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    ans_phrase = ''

    for letter in phrase:
        if letter.lower() == to_swap.lower():
            if letter.isupper() == True:
                ans_phrase += letter.lower()
            else:
                ans_phrase += letter.upper()
        else:
            ans_phrase += letter

    return ans_phrase