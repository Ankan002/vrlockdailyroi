import User from "./Modal/User";

const convertToMaxHeap = (referredUsersPackageAmounts) => {
    let currentIndex = Math.floor((referredUsersPackageAmounts.length - 1) / 2);

    while(currentIndex >= 0){
        maxHeapify(referredUsersPackageAmounts, currentIndex, referredUsersPackageAmounts.length - 1);
        currentIndex--;
    }
}

const heapPop = (referredUsersPackageAmounts) => {
    if(referredUsersPackageAmounts.length < 1) return 0;
    if(referredUsersPackageAmounts.length === 1) return referredUsersPackageAmounts.pop();

    [referredUsersPackageAmounts[0], referredUsersPackageAmounts[referredUsersPackageAmounts.length - 1]] = [referredUsersPackageAmounts[referredUsersPackageAmounts.length - 1], referredUsersPackageAmounts[0]];

    const maxValue = referredUsersPackageAmounts.pop();

    maxHeapify(referredUsersPackageAmounts, 0, referredUsersPackageAmounts.length - 1);

    return maxValue;
}

const maxHeapify = (referredUsersPackageAmounts, parentIndex, maxLength) => {
    if(parentIndex > maxLength || parentIndex < 0) return;

    let leftChildIndex = (parentIndex * 2) + 1;
    let rightChildIndex = (parentIndex * 2) + 2;
    let maxIndex = parentIndex;

    if(leftChildIndex <= maxLength && referredUsersPackageAmounts[leftChildIndex] > referredUsersPackageAmounts[maxIndex]) maxIndex = leftChildIndex;

    if(rightChildIndex <= maxLength && referredUsersPackageAmounts[rightChildIndex] > referredUsersPackageAmounts[maxIndex]) maxIndex = rightChildIndex;

    if(maxIndex !== parentIndex){
        [referredUsersPackageAmounts[parentIndex], referredUsersPackageAmounts[maxIndex]] = [referredUsersPackageAmounts[maxIndex], referredUsersPackageAmounts[parentIndex]];

        maxHeapify(referredUsersPackageAmounts, maxIndex, maxLength);
    }
}

export const calculateRewards = async (userId) => {
    const referredUsersPackageAmountString = await User.find({
        UpperLineSponserUser: userId
    })
    .select("PackageAmount");

    const referredUsersPackageAmounts = [];

    for(let stringAmount of referredUsersPackageAmountString) {
        referredUsersPackageAmounts.push(Number(stringAmount));
    }

    convertToMaxHeap(referredUsersPackageAmounts);

    let totalAmount = 0;

    for(let i=0; i<3; i++){
        if(i == 0){
            totalAmount += heapPop(referredUsersPackageAmounts) * (40 / 100);
            continue; 
        }
        totalAmount += heapPop(referredUsersPackageAmounts) * (30 / 100);
    }

    return totalAmount;
}