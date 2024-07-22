"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """


    def __init__(self, start=1):
        """Takes a start value and sets the counter to None and start instance to that number"""
        self.start = start
        self.counter = None
        # print(self.start)

    def generate(self):
        """Increments counter by one unless its the first time"""
        if self.counter == None:
            self.counter = self.start
        else:
            self.counter += 1
        print(self.counter)

    def reset(self):
        """Resets counter to None"""
        self.counter = None
        # print(self.counter)


