# Loopback-CRD-Test
Unusual behavior while running boot script to create/read/delete stored data. 

clone && npm install

1. Start by using `node .`
2. Ctrl C (or terminate the instance)
3. Run again with `node .`
4. Ctrl C (or terminate the instance)
5. Run again with `node .`

So, what's going on?

I'm adding an instance method (User.prototype.validPassword) to the User model.  To test the configuration, I created a boot script.  The boot script performs the following task: create a new user, find newly created user, and delete newly created user.  I've added log 'points' at key intervals.  

In the boot script:
 * At User.create({username:"admin", password:"admin})
  - Should return newly created User object (as seen by log of obj on console)
 * At User.findOne({ where: {username: obj.username }})
  - Should return queried user that was just created (logged as user to console)
 * At User.destroyById(user.id)
  - Should return nothing (will print finished)

Additional text is printed on screen for verification of script execution.  I.e. false is printed after validPassword makes a call to the callback method.  You can verify by modifing the callback value within /common/models/app-user/valid-password.js.

Whats the problem?

Running the program consecutive times, produces different results.  Now call the program and follow the above procedure.  (The listed items numbered 1-5)  I'm including an explanation of their output below.

1: node . => Everything behaves as normal:
  * All text is properly displayed to the screen, and a new data file is created (/data/app-users.json)
    - Look at app-users.json: ids has incremented to 2, and there is no saved model data.
    
2: Ctrl C

3: node . => When calling User.findOne({ where: {username: obj.username}}) is called, a null obj is returned.
  * if(!user){ return cb(); } was added so the program could countinue.
    - Observe the app-users.json:  The results should be similar to before, however...
      * The file contains an incremented id, but there exist an AppUser...
      
4: Ctrl C

5: node . => Now we get some familiar output, but it's not what it seems
  * Observe the id properties of the 1st and 2nd objects.
    - The newly created object (obj) has property id with value of 3
    - The old object (user) has property id with value 2
    - There should be one AppUser left in the data file, right...
      * Wrong.  Both object are removed and the ids tag remains at 3.
      
Conclusion:  I don't know what causes this behavior.  My inital thought is a misconfiguration of the loopback application.  My second is that the connector to the data source has a bug.  
