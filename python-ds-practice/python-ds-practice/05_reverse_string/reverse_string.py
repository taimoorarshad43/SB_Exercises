def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    ans = ''

    for x in range(len(phrase)-1, -1, -1): # Need to do -1 because exclusive set
        ans += phrase[x]
        # print(x)
        # print(ans)

    return ans

# reverse_string('hello')
