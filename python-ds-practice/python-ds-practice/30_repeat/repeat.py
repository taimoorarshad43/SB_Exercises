def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """

    if not isinstance(num, int):
        return None 
    
    if num < 0:
        return None
    elif num == 0:
        return ''
    
    ans = ''

    for x in range(0,num):
        ans += phrase

    return ans