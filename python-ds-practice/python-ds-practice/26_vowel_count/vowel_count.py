def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """

    phrase = phrase.replace(' ','')
    ansphrase = ''

    for char in phrase:
        if char.lower() in ['a', 'e', 'i', 'o', 'u']:
            ansphrase += char

    bag = {}

    for char in ansphrase:
        char = char.lower()
        if char not in bag:
            bag[char] = 1
        else:
            bag[char] += 1

    return bag