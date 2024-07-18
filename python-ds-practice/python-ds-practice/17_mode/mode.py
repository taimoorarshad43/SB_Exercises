def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """

    bag = {}

    for num in nums:
        if num not in bag:
            bag[num] = 1
        else:
            bag[num] = bag.get(num) + 1

    max = 0
    anskey = 0

    for key in bag.keys():
        if bag[key] > max:
            max = bag[key]
            anskey = key 

    return anskey

