def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """

    copy = []

    for x in range(0,len(lst)):
        if not lst[x]:
            continue
        else:
            copy.append(lst[x])

    return copy