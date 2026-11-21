import { test } from './realcustomfixture';

test('Validate clicking on PIM',async({loggedinpage,workerData,workerDetails}) =>{
  
    await loggedinpage.getByText('PIM').click();
     // Print workerData
    console.log('Worker Data:', workerData);

    // Print workerDetails
    console.log('Worker Details:', workerDetails);
    //can also wriitten a]like this 

    console.log('Worker ID:', workerData.workerId);
    console.log('Employee ID:', workerData.employeeId);
    console.log('Username:', workerData.username);

    console.log('Password:', workerDetails.password);
    console.log('Username:', workerDetails.username);

});

test('Validate clicking on Time',async({loggedinpage}) =>{
  
await loggedinpage.getByRole('link',{name: 'Time'}).click();

});

/*

Each worker gets its own worker-scoped fixture instances.
Fixture	                Worker 0	         Worker 1
workerDetails	        Created once	    Created once
workerData	            Created once	    Created once
loggedinpage	        Created per test	Created per test
workerIndex	                0	                0
employeeId	            EMP0001	             EMP1001


*/