def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """

    sum = 0

    # print(matrix)

    # Takes care of TL to BR

    for x in range(0, len(matrix)):
        # print(matrix[x][x])
        sum += matrix[x][x]

    # print(sum)

    # Takes care of TR to BL
    
    for x in range(0, len(matrix)):
        # print(matrix[x][-x+1])
        sum += matrix[x][-x+1]

    return sum