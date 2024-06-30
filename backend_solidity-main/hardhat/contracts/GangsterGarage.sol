// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract to manage a gangster's garage
contract GangsterGarage {
    // Hint 1: Use a dynamic array to store the names of the cars
    string[] public cars;

    // Function to add a car to the garage
    // Hint 2: The memory keyword is used for temporary storage in functions
    function addCar(string memory _carName) public {
        // Hint 3: Use the push method to add a new element to the array
        cars.push(_carName);
    }

    // Function to get the total number of cars in the garage
    // Hint 4: Arrays have a length property that gives the number of elements
    function getCarCount() public view returns (uint) {
        return cars.length;
    }

    // Bonus: Function to sell (remove) a car from the garage
    function sellCar(string memory _carName) public {
        bool carFound = false;

        for (uint i = 0; i < cars.length; i++) {
            if (
                keccak256(abi.encodePacked(cars[i])) ==
                keccak256(abi.encodePacked(_carName))
            ) {
                cars[i] = cars[cars.length - 1];
                cars.pop();
                carFound = true;
                break;
            }
        }

        require(carFound); // Removed custom error message
    }
}
