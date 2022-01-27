$(document).ready(function(){
	var user={};

	function register(e){
		user.idnumber = document.getElementById('idnumber').value;
		user.firstname = document.getElementById('firstname').value;
		user.lastname = document.getElementById('lastname').value;
		user.gender = document.getElementById('gender').value;
		user.bday = document.getElementById('bday').value;
		user.program = document.getElementById('program').value;
		user.yearlevel = document.getElementById('yearlevel').value;
		console.log(user);

		$.ajax({
			type:"POST",
			data:{action:"register", userdata:user},
			url:"src/php/user.php",
			success:function(response){
				idresponse = jQuery.parseJSON(response);
				var table = $("#usertable tbody");
				if(idresponse==0){
					alert("Error saving the user!");
				}else{
					user.id = idresponse;
					appendUser(user, table);
				}
				$("#userForm").find("input, select").val("");
			},
		});
		e.preventDefault();
	}

	function getUsers(){
		$.ajax({
			type:"GET",
			data:{action:"getusers"},
			url:"src/php/user.php",
			success:function(response){
				users = jQuery.parseJSON(response);
				var table = $("#usertable tbody");
				for(var i =0; i < users.length; i++){
					appendUser(users[i], table);
				}	
			},
		});
	}
	

	function appendUser(user, table){
		
		row = "<tr>"+
			"<th scope=\"row\" id='userID' data-id='user.id'>"+ user.id +"</th>"+
				"<td>"+ user.idnumber +"</td>"+
				"<td>"+ user.firstname +"</td>"+
				"<td>"+ user.lastname +"</td>"+
				"<td>"+ user.gender +"</td>"+
				"<td>"+ user.bday +"</td>"+
				"<td>"+ user.program +"</td>"+
				"<td>"+ user.yearlevel +"</td>"+

			   	"<td>" + "<button type='button'" + 
			   	"class='btn btn-success userUpdate'" + 
			   	"id='"+user.id+"'" + 
			   	"userI='"+user.idnumber+"'" + 
			   	"userF='"+user.firstname+"'" + 
			   	"userL='"+user.lastname+"'"+  
			   	"userG='"+user.gender+"'"+ 
			   	"userB='"+user.bday+"'"+ 
			   	"userP='"+user.program+"'"+ 
			   	"userY='"+user.yearlevel+"'"+
			   	"<b>Update</b>" + "</button>" + "</td>" +

		    	"<td>" + "<button type='button'" + "class='btn btn-danger delete'" + "id='"+user.id+"'" + "<b>Delete</b>" + "</button>" + "</td>" +
			"</tr>";		
		table.append(row);
	}

	$("#userForm").submit(register);
	getUsers();

/* Update functions*/

	// connecting the modal 
	modal = document.getElementById("myModal");

	// here it connects the button that opens the modal
	btn = document.getElementById("myBtn");

	// This closes the modal
	CancelButton = document.getElementsByClassName("close")[0];

	// When the Cancel is clicked, it closes the update form and return to the main page
	CancelButton.onclick = function() {
	  modal.style.display = "none";
	}


//When the Update button is clicked, the user data which is to be update will be appear to be updated in modal and saved again to the database.

	$(document).on("click",".userUpdate",function(){
	modal.style.display = "block";
		var userI = $(this).attr('userI');
		var ids = $(this).attr("id");
		var userF = $(this).attr('userF');
		var userL = $(this).attr("userL");
		var userG = $(this).attr('userG');
		var userB = $(this).attr("userB");
		var userP = $(this).attr('userP');		
		var userY = $(this).attr("userY");
		

				$('input[id=usersid]').val(ids);
				$('input[id=upidnumber]').val(userI);
				$('input[id=upfirstname]').val(userF);
				$('input[id=uplastname]').val(userL);
				$('input[id=upgender]').val(userG);
				$('input[id=upbday]').val(userB);
				$('input[id=upprogram]').val(userP);
				$('input[id=upyearlevel]').val(userY);
	});










// When Update button is clicked, the function here will connect to the php UPDATE query

$(document).on("click","#editUser",function(){
	
	var dataform =$('#updateUserForm');
	userID = document.getElementById('usersid').value;
	userIDnumber = document.getElementById('upidnumber').value;
	userFirstname = document.getElementById('upfirstname').value;
	userLastname = document.getElementById('uplastname').value;
	userGender = document.getElementById('upgender').value;
	userBday = document.getElementById('upbday').value;
	userProgram = document.getElementById('upprogram').value;
	userYearlevel = document.getElementById('upyearlevel').value;

	  if(confirm("Are you sure you want to update this account?")){
			$.ajax({
				dataType: 'json',
				type:"POST",
				
				//after confirming, the data will be delivered to user.php then it will be saved to the database.
				
				data:{action:"user_update", userID:userID, userIDnumber:userIDnumber, userFirstname:userFirstname,
					userLastname:userLastname, userGender:userGender, userBday:userBday,
					userProgram:userProgram, userYearlevel:userYearlevel },
				url:"src/php/user.php",

			});
	    }
	});



});



