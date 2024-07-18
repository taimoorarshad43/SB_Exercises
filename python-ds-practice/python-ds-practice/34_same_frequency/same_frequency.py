def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    num1 = str(num1)
    num2 = str(num2)

    if len(num1) != len(num2): # if the lengths aren't the same, the they cannot possibly have the same frequency
        return False
    
    bag1 = {}
    bag2 = {}

    for x in num1:
        if x not in bag1:
            bag1[x] = 1
        else:
            bag1[x] += 1

    for y in num2:
        if y not in bag2:
            bag2[y] = 1
        else:
            bag2[y] += 1

    if bag1 == bag2: # Even though the ordering is off, the contents are the same
        return True
    
    return False