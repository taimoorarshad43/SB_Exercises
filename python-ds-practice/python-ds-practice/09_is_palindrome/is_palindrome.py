def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """

    phrase = phrase.replace(' ', '')

    l = 0
    r = len(phrase) -1

    while l < r:
        if phrase[l].lower() == phrase[r].lower():
            l += 1
            r -= 1
        else:
            return False
        
    return True