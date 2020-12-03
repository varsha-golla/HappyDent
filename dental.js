var express = require('express')
var app = express()
var sql=require('mysql')
var connection = sql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'vdc',
  multipleStatements : true
});
//mutler
const path = require('path');
const ejs=require('ejs');
const multer = require('multer');
var dummy=0;
app.use(express.static('static'))
var request = require('request')
app.set('view engine', 'ejs')
var session = require('express-session')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'roja', cookie: { maxAge: 60000000 }}))


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: 'static/images/',
  filename: function(req, file, cb){
    //cb(null,file.originalname);
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    //cb(null,file.originalname + '-' + path.extname(file.originalname));
  }
});

function checkFileType(file, cb){
  //console.log(file)
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');






app.post('/upload/:op_number', (req, res) => {
	//console.log("in upl;oad ")

//console.log(req.params.op_number)
 var op_number=req.params.op_number
  upload(req, res, (err) => {
    if(err){
    	//console.log(err)
      res.render('upload', {
        msg:'Error: Images Only!',
        op_number:op_number,
          flag:0
      });
    } else {
      if(req.file == undefined){
        res.render('upload', {
          msg: 'Error: No File Selected!',
          op_number:op_number,
          flag:0
        });
      } else {
        var name=req.file.filename
        var op_number=req.params.op_number
        var loc = 'C:/Users/SAI ROJA/Documents/fullstack/facelink/static/images/'+name
        var q = "insert into images values('"+op_number+"','"+name+"')";
        connection.query(q,function(err,data){
            if(err) res.render('errorpage',{result:err});
            else{
              res.render('upload',{data:data,flag:1,op_number:op_number})
            }  
  })
        //console.log("C:/Users/SAI ROJA/Documents/fullstack/facelink/static/images/"+req.file.filename)
      }
    }
  });
});


app.get('/beforeupload/:op_number',function(req,res){
	var opnum=req.params.op_number
	//console.log("requested for upload")
	res.render('upload',{op_number:opnum,data:null,flag:0})
})


app.get('/PreOperation',function(req,res){
	res.render('PreOperation',{})
})


app.get('/PreOperationSubmit',function(req,res){
	
  //insertion into preoperation details table
	//console.log(req.session.opnum)
  	var diabetes=req.query.diabetes,Hypertension=req.query.Hypertension;
  	var cvd=req.query.cvd;
  	var Bleeding_disorders=req.query.Bleeding_disorders+"*"+req.query.Bleeding_disorderstext;
    var thyroid_disorders=req.query.thyroid_disorders+"*"+req.query.Thyroid;
    var bone_disorders=req.query.bone_disorders+"*"+req.query.Bone;
    var Neuromuscular=req.query.Neuromuscular+"*"+req.query.neuromuscular;
    var Mentally=req.query.Mentally;
    var Congential_description=req.query.Congential_description;
    var medical_conditions_description=req.query.medical_conditions_descriptions;
    var Platelet=req.query.Platelet+"*"+req.query.Plateletdesc;
  	var RBC=req.query.RBC+"*"+req.query.RBCdesc;
  	var WBC=req.query.WBC+"*"+req.query.WBCdesc;
  	var INR=req.query.INR+"*"+req.query.INRdesc;
  	var RBS=req.query.RBS+"*"+req.query.RBSdesc;
  	var HbsAgdesc=req.query.HbsAgdesc;
  	var HIVdesc=req.query.HIVdesc;
  	var HCVdesc=req.query.HCVdesc;
  	var otherdesc=req.query.otherdesc;
  	var Bruxism=req.query.Bruxism+"*"+req.query.Bruxismdesc;
  	var Smoking=req.query.Smoking+"*"+req.query.Smokingfreq+"*"+req.query.Smokingduration;
  	var Pan=req.query.Pan+"*"+req.query.panchewingdesc;
  	var Thrusting =req.query.Thrusting+"*"+req.query.Thrustingdesc;
  	var Alcohol =req.query.Alcohol+"*"+req.query.Alcoholdesc;
  	var other_habits_desc=req.query.other_habits_desc;
  	var Brushing =req.query.Brushing;
	var Flossing =req.query.Flossing;
	var Mouthwash =req.query.Mouthwash;
	var Softtissue=req.query.Softtissue;
	var groupright=req.query.groupright;
	var groupleft=req.query.groupleft;
	var Interferencesright=req.query.Interferencesright;
	var Interferencesleft=req.query.Interferencesleft;
	var protruisive=req.query.protruisive;
	var ridge=req.query.ridge;
	var implant=req.query.implant;
	var Delayedimplant=req.query.Delayedimplant;
	var Buccal=req.query.Buccal;
	var Lingual=req.query.Lingual;
	var Residual=req.query.Residual;
	var op_number=req.session.opnum;
  	var notes=req.query.Surgicalnotes;
    var quer1="insert into preoperation_details values('"+ diabetes +"','" + Hypertension + "','" + Bleeding_disorders + "','" + thyroid_disorders + "','" + bone_disorders + "','" + Neuromuscular + "','" + Mentally + "','" + Congential_description + "','" + medical_conditions_description + "','" + Platelet + "','" + RBC + "','" + WBC + "','" + INR + "','" + RBS + "','" + HbsAgdesc + "','" + HIVdesc + "','" + HCVdesc + "','" + otherdesc + "','" + Bruxism + "','" + Smoking + "','" + Pan + "','" + Thrusting + "','" + Alcohol + "','" + other_habits_desc + "','" + Brushing + "','" + Flossing + "','" + Mouthwash + "','" + Softtissue + "','" + groupright + "','" + groupleft + "','" + Interferencesright + "','" + Interferencesleft + "','" + protruisive + "','" + ridge + "','" + implant + "','" + Delayedimplant + "','" + Buccal + "','" + Lingual + "','" + Residual + "','"+op_number+"','"+cvd+"','"+notes+"')";
    connection.query(quer1, function (err, result) {
    if (err)
    	res.render('errorpage',{result:err});
  });    
	res.render('IntraOperation')
})


app.get('/IntraOperationSubmit',function(req,res){
	var op_number=req.session.opnum;
	var implant =req.query.implant,implantres="";
	if(implant!=undefined){
		if(typeof(implant)=="string"){
			implantres=implant;
		}
		else
	 	for(var i=0;i<implant.length;i++) {
		if(i!=0)
		  implantres=implantres+"*"+implant[i];
		else
			implantres=implant[i];
	}
	}
	var flaptear=req.query.flaptear;
	var bonedehiscence=req.query.bonedehiscence;
	var bonedehiscenceres="";
	if(bonedehiscence!=undefined){
	if(typeof(bonedehiscence)=="string") bonedehiscenceres=bonedehiscence;
	else 
	for(var i=0;i<bonedehiscence.length;i++) {
		if(i!=0)
		  bonedehiscenceres=bonedehiscenceres+"*"+bonedehiscence[i];
		else
			bonedehiscenceres=bonedehiscence[i];
	}
	}
	var site=req.query.site,siteres="";
	if(site!=undefined){
	if(typeof(site)=="string") siteres=site;
	else
		 for(var i=0;i<site.length;i++) {
		if(i!=0)
		  siteres=siteres+"*"+site[i];
		else
			siteres=site[i];
	}
	}
	var dehiscene=req.query.dehiscene;
	var sinus=req.query.sinus;
	var membrane=req.query.membrane;
	var nasal=req.query.nasal;
	var fossa=req.query.fossa,fossares="";
	if(fossa!=undefined){
		if(typeof(fossa)=="string") fossares=fossa;
		else
		 for(var i=0;i<fossa.length;i++) {
		if(i!=0)
		  fossares=fossares+"*"+fossa[i];
		else
			fossares=fossa[i];
		}
	}
	var nerve=req.query.nerve,nerveres="";
	if(nerve!=undefined){
		if(typeof(nerve)=="string") nerveres=nerve;
		else
    for(var i=0;i<nerve.length;i++) {
		if(i!=0)
		  nerveres=nerveres+"*"+nerve[i];
		else
			nerveres=nerve[i];
	}
	}
	var intrableed=req.query.intrableed,intrableedres="";
	if(intrableed!=undefined){
		if(typeof(intrableed)=="string") intrableedres=intrableed;
		else
	for(var i=0;i<intrableed.length;i++) {
		if(i!=0)
		  intrableedres=intrableedres+"*"+intrableed[i];
		else
			intrableedres=intrableed[i];
	}
	}
	var sixmonths=req.query.sixmonths;
	var oneyear=req.query.oneyear;
	var threeyears=req.query.threeyears;
	var fiveyears=req.query.fiveyears;
	var tenyears=req.query.tenyears;
	var implantstability=req.query.implantstability,implantstabilityres="";
	if(implantstability!=undefined) {
		if(typeof(implantstability)=="string") implantstabilityres=implantstability;
		else
		for(var i=0;i<implantstability.length;i++) {
		if(i!=0)
		  implantstabilityres=implantstabilityres+"*"+implantstability[i];
		else
			implantstabilityres=implantstability[i];
	}
	}
	var implantdiameter=req.query.implantdiameter,implantdiameterres="";
	if(implantdiameter!=undefined){
		if(typeof(implantdiameter)=="string")  implantdiameterres=implantdiameter;
		else

		 for(var i=0;i<implantdiameter.length;i++) {
		if(i!=0)
		  implantdiameterres=implantdiameterres+"*"+implantdiameter[i];
		else
			implantdiameterres=implantdiameter[i];
	}
	}
	var implantlength=req.query.implantlength,implantlengthres="";
	if(implantlength!=undefined) {
		if(typeof(implantlength)=="string" ) implantlengthres=implantlength;
		else
		for(var i=0;i<implantlength.length;i++) {
		if(i!=0)
		  implantlengthres=implantlengthres+"*"+implantlength[i];
		else
			implantdiameterres=implantlength[i];
	}
	}
	var implantplaced=req.query.implantplaced;
	var buccalcortical=req.query.buccalcortical;
	var corticalplate=req.query.corticalplate;
	var implantsinus=req.query.implantsinus;
	var spinningofimplant=req.query.spinningofimplant;
	var reservedsocket=req.query.reservedsocket;
	var nutrientcanal=req.query.nutrientcanal;
	var excessivebleeding=req.query.excessivebleeding;
	var drill=req.query.drill;
	var ridgesplit=req.query.ridgesplit;
	var steppedosteotomy=req.query.steppedosteotomy;
	var piezotips=req.query.piezotips;
	var bonetap=req.query.bonetap;
	var countersink=req.query.countersink;
	var bonecondesation=req.query.bonecondesation;
	var tensionfreeflap=req.query.tensionfreeflap;
	var pediclegraft=req.query.pediclegraft;
	var flapdehiscence=req.query.flapdehiscence;
	var aprfused=req.query.aprfused;
	var typeofsuturing=req.query.typeofsuturing;
	var Grafted=req.query.Grafted,radioGrafted="";
	if(Grafted=="Grafted"){
		 radioGrafted="Grafted*"+req.query.radioGrafted;
		 radioGrafted=radioGrafted+req.query.grafttext;
	}
	else{
		radioGrafted="No graft";
	}
	var mesh=req.query.mesh;
	var ridge=req.query.ridge;
	var ridge_aug0=req.query.ridge_aug0;
	var ridge_aug1=req.query.ridge_aug1;
	var sinusamount=req.query.sinusamount;
	var direct_sinus=req.query.direct_sinus;
	var indirect_sinus=req.query.indirect_sinus;
	var nerve_repositioning=req.query.nerve_repositioning;
	var six_months=req.query.six_months;
	var quality_of_graft=req.query.quality_of_gratf;
	var quantity_of_graft=req.query.quantity_of_graft;
	var morbidity=req.query.morbidity;
	var bleed=req.query.bleed;
	var socket=req.query.socket;
	var socketcheck=req.query.socketcheck;
	//console.log("..........................."+socketcheck)
    if(socketcheck!="yes")
    	socketcheck=""
	//console.log("...........................2"+socketcheck)
	var Root_length=req.query.Root_length;
	var Root_width=req.query.Root_width;
	var Thickness_of_sheild=req.query.Thickness_of_sheild;
	var Condition_of_adjacent_tooth=req.query.Condition_of_adjacent_tooth;
	var Connective_tissuegraft=req.query.Connective_tissuegraft;
	var Free_gingival_graft=req.query.Free_gingival_graft;
	var density=req.query.density,densityres="";
	if(density!=undefined){
		if(typeof(density)=="string") densityres=density;
		else
	 for(var i=0;i<density.length;i++) {
		if(i!=0)
		  densityres=densityres+"*"+density[i];
		else
			densityres=density[i];
	}
	densityres=densityres+"*"+req.query.densitytext;
	}
	var notes = req.query.Surgicalnotes;

    var quer3="insert into intraoperation_details values('"+ implantres +"','" + flaptear + "','" + bonedehiscenceres+ "','" + siteres + "','" + dehiscene + "','" + sinus + "','" + membrane + "','" + nasal + "','" + fossares + "','" + nerveres+ "','" +intrableedres+ "','" +sixmonths+ "','" +oneyear+ "','" +threeyears+ "','" +fiveyears+ "','" +tenyears+ "','" +implantstabilityres+ "','" +implantdiameterres+ "','" +implantlengthres+ "','" +implantplaced+ "','" +buccalcortical+ "','" +corticalplate+ "','" +implantsinus+ "','" +spinningofimplant+ "','" +reservedsocket+ "','" +nutrientcanal+ "','" +excessivebleeding+ "','" +drill+ "','" +ridgesplit+ "','" +steppedosteotomy+ "','" +piezotips+ "','" +bonetap+ "','" +countersink+ "','" +bonecondesation+ "','" +tensionfreeflap+ "','" +pediclegraft+ "','" +flapdehiscence+ "','" +aprfused+ "','" +typeofsuturing+ "','" +radioGrafted+ "','" +mesh+ "','" +ridge+ "','" +ridge_aug0+ "','" +ridge_aug1+ "','" +sinusamount+ "','" +direct_sinus+ "','" +indirect_sinus+ "','" +nerve_repositioning+ "','" +six_months+ "','" +quality_of_graft+ "','" +quantity_of_graft+ "','" +morbidity+ "','" +bleed+ "','" +socket+ "','" +Root_length+ "','" +Root_width+ "','" +Thickness_of_sheild+ "','" +Condition_of_adjacent_tooth+ "','" +Connective_tissuegraft+ "','" +Free_gingival_graft+"','"+densityres+"','"+socketcheck+"','"+notes+"','"+op_number+"')";
    connection.query(quer3, function (err, result) {
    if (err) res.render('errorpage',{result:err});
    else {
    	dummy=1;	//console.log("successfully entered new record")
    }
  });
res.render('PostOperation')
})


app.get('/PostOperation',function(req,res){
	res.render('PostOperation',{})
})

app.get('/PostOperationSubmit',function(req,res){
var fractureimp=req.query.fractureimp;
var infection=req.query.infection;
var excess=req.query.excess;
var excessinsertion=req.query.excessinsertion;
var temporaryrestoration=req.query.temporaryrestoration;
var loadingprotocol=req.query.loadingprotocol;
var prosthesis=req.query.prosthesis+"*"+req.query.prosthesis1;
var materialofprosthesis=req.query.materialofprosthesis;
var abutment=req.query.abutment;
var swell=req.query.swell;
var pain=req.query.pain;
var infectionone=req.query.infectionone;
var fistula=req.query.fistula;
var softtissue=req.query.softtissue;
var paresthesia=req.query.paresthesia;
var implantfail=req.query.implantfail;
var boneloss=req.query.boneloss;
var infectmonth=req.query.infectmonth;
var swellmonth=req.query.swellmonth;
var paresthesiamonth=req.query.paresthesiamonth;
var bonelossmonth=req.query.bonelossmonth;
var status3=req.query.status3;
var screw6=req.query.screw6;
var implantfail6=req.query.implantfail6;
var fracture6=req.query.fracture6;
var screwfracture6=req.query.screwfracture6;
var prosthesis6=req.query.Prothesis6;
var prosthesisfracture6=req.query.prosthesisfracture6;
var crestal6=req.query.crestal6;
var mobility6=req.query.mobility6;
var gingival6=req.query.gingival6;
var ballgingival6=req.query.ballgingival6;
var peri6=req.query.peri6;
var status1=req.query.status1;
var implant1=req.query.implant1;
var mobility1=req.query.mobility1;
var loosening1=req.query.loosening1;
var implantfail1=req.query.implantfail1;
var fracture1=req.query.fracture1;
var screwfracture1=req.query.screwfracture1;
var Prosthesis1=req.query.Prosthesis1;
var prosthesisfracture1=req.query.prosthesisfracture1;
var crestal1=req.query.crestal1;
var gingival1=req.query.gingival1;
var ballgingival1=req.query.ballgingival1;
var peri1=req.query.peri1;
var discolor1=req.query.discolor1;
var op_number=req.session.opnum;
var notes=req.query.Surgicalnotes;

var quer2 = "insert into postoperation_details values('"+fractureimp+"','" +infection+"','" +excess+"','" +excessinsertion+"','" +temporaryrestoration+"','" +loadingprotocol+"','" +prosthesis+"','" +materialofprosthesis+"','" +abutment+"','" +swell+"','" +pain+"','" +infectionone+"','" +fistula+"','" +softtissue+"','" +paresthesia+"','" +implantfail+"','" +boneloss+"','" +infectmonth+"','" +swellmonth+"','" +paresthesiamonth+"','" +bonelossmonth+"','" +status3+"','" +screw6+"','" +implantfail6+"','" +fracture6+"','" +screwfracture6+"','" +prosthesis6+"','" +prosthesisfracture6+"','" +crestal6+"','" +mobility6+"','" +gingival6+"','" +ballgingival6+"','" +peri6+"','" +status1+"','" +implant1+"','" +mobility1+"','" +loosening1+"','" +implantfail1+"','" +fracture1+"','" +screwfracture1+"','" +Prosthesis1+"','" +prosthesisfracture1+"','" +crestal1+"','" +gingival1+"','" +ballgingival1+"','" +peri1+"','" +discolor1+"','" +notes+"','"+op_number+"')";

connection.query(quer2, function (err, result) {
    if (err) res.render('errorpage',{result:err});
    var op_num=req.session.opnum
	res.redirect('/DetailsByOpnumSubmit/'+op_num)
  });
})

app.get('/DetailsByOpnumSubmitprev',function(req,res){
	var op_num=req.query.Opnum
	res.redirect('/DetailsByOpnumSubmit/'+op_num)
})

app.get('/IntraOperation',function(req,res){
	res.render('IntraOperation',{})
})


app.get('/details',function(req,res){
	res.render('DetailsByOpnum',{"error":false})
})


app.get('/prev',function(req,res){
	var op_num=req.query.Opnum
	res.redirect('/DetailsByOpnumSubmit/'+op_num)
})



app.get('/DetailsByOpnumSubmit/:patient_id',function(req,res){
	var op_num=req.params.patient_id
	req.session.op_number=op_num
	//console.log("OPNUM................"+op_num);
	var patient_query="select * from patient_details where op_number="+op_num;
	connection.query(patient_query, function (err, result) {
    if (result==undefined || result.length<=0) {
    	res.render('DetailsByOpnum_notvalid',{"error":true});
    }
    else{
    	//console.log(result);
		var pre_query="select * from preoperation_details where op_number="+op_num;
		var post_query = "select * from postoperation_details where op_number="+op_num;
		var intra_query = "select * from intraoperation_details where op_number="+op_num;
		var main_query = pre_query+";"+intra_query+";"+post_query;
		connection.query(main_query,function(err,main_result,fields){
			if(err)
				res.render('errorpage',{result:err});
			//console.log("intra result"+main_result[1])
			res.render('DetailsByOpnumSubmit',{pre_res:main_result[0],post_res:main_result[2],intra_res:main_result[1],op_number:op_num})
		})
	}
    });
})

app.get('/showImages/:op_number',function(req,res){
	var op_number = req.params.op_number;
    var q="select * from images where op_number="+op_number;
     connection.query(q,function(err,data){
            if(err) res.render('errorpage',{result:err});
            else{
              res.render('uploaded',{data:data,op_number:op_number})
            }  
  }) 
})

app.get('/',function(req,res){
	res.sendFile(__dirname+'/static/index.html')
})


app.get('/PersonalDetails',function(req,res){
	res.render('personal_details',{exists:"no"})
})

app.post('/signin',function(req,res){
	var username=req.body.loginid
	var pass=req.body.pwd
	var q="insert into users values('"+username+"','"+pass+"')";
	connection.query(q,function(err,data){
		if(err)
			res.render('errorpage',{result:err});
	})
	res.render('matter',{})
})



app.post('/loginsubmit',function(req,res){
	var name=req.body.loginid
	var pwd=req.body.pwd
	var q="select * from users where userid='"+name+"' and password='"+pwd+"'";
	connection.query(q,function(err,data){
		if(err)
			res.render('errorpage',{result:err})
		else if(data.length>0){
			res.render('matter',{})
		}
		else{
			res.render('loginfail',{})
		}
	})	    
})

app.get('/agequery',function(req,res){
	res.render('agequery')
})

app.post('/agequerySubmit',function(req,res){
	var age = req.body.age;
	var gender=req.body.gender;
	var query = "select op_number,name from patient_details where ";
	if(age!="" && gender!="none"){
		query=query+"age = '"+age+"' and gender = '"+gender+"'";
	}
	else if(age=="" && gender!="none"){
		query=query+"gender = '"+gender+"'";
	}
	else{
		query=query+"age = '"+age+"'";
	}
	connection.query(query,function(err,data){
		if(err)
			res.render('errorpage')
		if(data.length>0)
			res.render('fetch_details',{result:data})
		else
			res.render('nodata',{})
	})
	// console.log("gender "+gender+"     age "+age)
	// console.log(query)
})


app.get('/allrecords',function(req,res){
	var q="select op_number,name from patient_details";
	connection.query(q,function(err,data){
		if(err) res.render('errorpage',{result:err});
		if(data.length>0){
			res.render('fetch_details',{result:data})
		}
		else{
			res.render('nodata',{})
		}
	})
})

app.get('/PersonalDetailsSubmit',function(req,res){
	var name=req.query.name,age=req.query.age,gender=req.query.gender;
	var op_num=req.query.op_num,occ=req.query.occ,address=req.query.address;
	var mobile = req.query.mobile,email=req.query.email;
 	var testquery="select * from patient_details where op_number='"+op_num+"'";
 	//console.log(op_num)
 	if(op_num==""){
 		res.render('personal_details',{exists:"null"})
 	}

 	connection.query(testquery,function(err,data){
 		if(data.length>0){
 			res.render('personal_details',{exists:"yes"})
 		}
 		else{
 			req.session.opnum=op_num;

 			var quer="insert into patient_details values('" + name + "','" + age + "','" + gender + "','" + op_num + "','" + occ + "','" + address +"','" + mobile +"','" + email+"')";
		  	//var q = "insert into images values('"+op_number+"','"+name+"')";
		  	connection.query(quer, function (err, result) {
		    	if (err) res.render('errorpage',{result:err});
			})
    		res.render('PreOperation',{})
 		}
 	})
  //});
})


app.get('/pre_save',function(req,res){
  //updation into preoperation details table
  	var diabetes=req.query.diabetes,Hypertension=req.query.Hypertension;
  	var cvd=req.query.cvd;
  	var Bleeding_disorders=req.query.Bleeding_disorders+"*"+req.query.Bleeding_disorderstext;
    var thyroid_disorders=req.query.thyroid_disorders+"*"+req.query.Thyroid;
    var bone_disorders=req.query.bone_disorders+"*"+req.query.Bone;
    var Neuromuscular=req.query.Neuromuscular+"*"+req.query.neuromuscular;
    var Mentally=req.query.Mentally;
    var Congential_description=req.query.Congential_description;
    var medical_conditions_description=req.query.medical_conditions_descriptions;
    var Platelet=req.query.Platelet+"*"+req.query.Plateletdesc;
  	var RBC=req.query.RBC+"*"+req.query.RBCdesc;
  	var WBC=req.query.WBC+"*"+req.query.WBCdesc;
  	var INR=req.query.INR+"*"+req.query.INRdesc;
  	var RBS=req.query.RBS+"*"+req.query.RBSdesc;
  	var HbsAgdesc=req.query.HbsAgdesc;
  	var HIVdesc=req.query.HIVdesc;
  	var HCVdesc=req.query.HCVdesc;
  	var otherdesc=req.query.otherdesc;
  	var Bruxism=req.query.Bruxism+"*"+req.query.Bruxismdesc;
  	var Smoking=req.query.Smoking+"*"+req.query.Smokingfreq+"*"+req.query.Smokingduration;
  	var Pan=req.query.Pan+"*"+req.query.panchewingdesc;
  	var Thrusting =req.query.Thrusting+"*"+req.query.Thrustingdesc;
  	var Alcohol =req.query.Alcohol+"*"+req.query.Alcoholdesc;
  	var other_habits_desc=req.query.other_habits_desc;
  	var Brushing =req.query.Brushing;
	var Flossing =req.query.Flossing;
	var Mouthwash =req.query.Mouthwash;
	var Softtissue=req.query.Softtissue;
	var groupright=req.query.groupright;
	var groupleft=req.query.groupleft;
	var Interferencesright=req.query.Interferencesright;
	var Interferencesleft=req.query.Interferencesleft;
	var protruisive=req.query.protruisive;
	var ridge=req.query.ridge;
	var implant=req.query.implant;
	var Delayedimplant=req.query.Delayedimplant;
	var Buccal=req.query.Buccal;
	var Lingual=req.query.Lingual;
	var Residual=req.query.Residual;
	var op_number=req.session.op_number;
	var notes=req.query.Surgicalnotes;
	var quer8="delete from preoperation_details where op_number='"+op_number+"'";
    var quer4="insert into preoperation_details values('"+ diabetes +"','" + Hypertension + "','" + Bleeding_disorders + "','" + thyroid_disorders + "','" + bone_disorders + "','" + Neuromuscular + "','" + Mentally + "','" + Congential_description + "','" + medical_conditions_description + "','" + Platelet + "','" + RBC + "','" + WBC + "','" + INR + "','" + RBS + "','" + HbsAgdesc + "','" + HIVdesc + "','" + HCVdesc + "','" + otherdesc + "','" + Bruxism + "','" + Smoking + "','" + Pan + "','" + Thrusting + "','" + Alcohol + "','" + other_habits_desc + "','" + Brushing + "','" + Flossing + "','" + Mouthwash + "','" + Softtissue + "','" + groupright + "','" + groupleft + "','" + Interferencesright + "','" + Interferencesleft + "','" + protruisive + "','" + ridge + "','" + implant + "','" + Delayedimplant + "','" + Buccal + "','" + Lingual + "','" + Residual + "','"+op_number+"','"+cvd+"','"+notes+"')";
    connection.query(quer8, function (err, result) {
    	if (err) res.render('errorpage',{result:err});
    	connection.query(quer4, function (err, result) {
    	if (err) res.render('errorpage',{result:err});
    		res.redirect('/DetailsByOpnumSubmit/'+op_number)
    		// res.send("SUCCESS")
    		// res.jsonp({success : true})
  		});
  	});    
})


app.get('/intra_save',function(req,res){
	var op_number=req.session.op_number;
	//console.log("opnumberrrrrrrrrrrrrrrrrr"+op_number)
	var implant =req.query.implant,implantres="";
	if(implant!=undefined){
		if(typeof(implant)=="string"){
			implantres=implant;
		}
		else
	 	for(var i=0;i<implant.length;i++) {
		if(i!=0)
		  implantres=implantres+"*"+implant[i];
		else
			implantres=implant[i];
	}
	}
	var flaptear=req.query.flaptear;
	var bonedehiscence=req.query.bonedehiscence;
	var bonedehiscenceres="";
	if(bonedehiscence!=undefined){
		if(typeof(bonedehiscence)=="string") bonedehiscenceres=bonedehiscence;
		else 
		for(var i=0;i<bonedehiscence.length;i++) {
			if(i!=0)
			  bonedehiscenceres=bonedehiscenceres+"*"+bonedehiscence[i];
			else
				bonedehiscenceres=bonedehiscence[i];
		}
	}
	var site=req.query.site,siteres="";
	if(site!=undefined){
		if(typeof(site)=="string") siteres=site;
		else
			 for(var i=0;i<site.length;i++) {
			if(i!=0)
			  siteres=siteres+"*"+site[i];
			else
				siteres=site[i];
		}
	}
	var dehiscene=req.query.dehiscene;
	var sinus=req.query.sinus;
	var membrane=req.query.membrane;
	var nasal=req.query.nasal;
	var fossa=req.query.fossa,fossares="";
	if(fossa!=undefined){
		if(typeof(fossa)=="string") fossares=fossa;
		else
		 for(var i=0;i<fossa.length;i++) {
		if(i!=0)
		  fossares=fossares+"*"+fossa[i];
		else
			fossares=fossa[i];
	}
	}
	var nerve=req.query.nerve,nerveres="";
	if(nerve!=undefined){
		if(typeof(nerve)=="string") nerveres=nerve;
		else
    for(var i=0;i<nerve.length;i++) {
		if(i!=0)
		  nerveres=nerveres+"*"+nerve[i];
		else
			nerveres=nerve[i];
	}
	}
	var intrableed=req.query.intrableed,intrableedres="";
	if(intrableed!=undefined){
		if(typeof(intrableed)=="string") intrableedres=intrableed;
		else
	for(var i=0;i<intrableed.length;i++) {
		if(i!=0)
		  intrableedres=intrableedres+"*"+intrableed[i];
		else
			intrableedres=intrableed[i];
	}
	}
	var sixmonths=req.query.sixmonths;
	var oneyear=req.query.oneyear;
	var threeyears=req.query.threeyears;
	var fiveyears=req.query.fiveyears;
	var tenyears=req.query.tenyears;
	var implantstability=req.query.implantstability,implantstabilityres="";
	if(implantstability!=undefined) {
		if(typeof(implantstability)=="string") implantstabilityres=implantstability;
		else

		for(var i=0;i<implantstability.length;i++) {
		if(i!=0)
		  implantstabilityres=implantstabilityres+"*"+implantstability[i];
		else
			implantstabilityres=implantstability[i];
	}
	}
	var implantdiameter=req.query.implantdiameter,implantdiameterres="";
	if(implantdiameter!=undefined){
		if(typeof(implantdiameter)=="string")  implantdiameterres=implantdiameter;
		else

		 for(var i=0;i<implantdiameter.length;i++) {
		if(i!=0)
		  implantdiameterres=implantdiameterres+"*"+implantdiameter[i];
		else
			implantdiameterres=implantdiameter[i];
	}
	}
	var implantlength=req.query.implantlength,implantlengthres="";
	if(implantlength!=undefined) {
		if(typeof(implantlength)=="string" ) implantlengthres=implantlength;
		else
		for(var i=0;i<implantlength.length;i++) {
		if(i!=0)
		  implantlengthres=implantlengthres+"*"+implantlength[i];
		else
			implantdiameterres=implantlength[i];
	}
	}
	var implantplaced=req.query.implantplaced;
	var buccalcortical=req.query.buccalcortical;
	var corticalplate=req.query.corticalplate;
	var implantsinus=req.query.implantsinus;
	var spinningofimplant=req.query.spinningofimplant;
	var reservedsocket=req.query.reservedsocket;
	var nutrientcanal=req.query.nutrientcanal;
	var excessivebleeding=req.query.excessivebleeding;
	var drill=req.query.drill;
	var ridgesplit=req.query.ridgesplit;
	var steppedosteotomy=req.query.steppedosteotomy;
	var piezotips=req.query.piezotips;
	var bonetap=req.query.bonetap;
	var countersink=req.query.countersink;
	var bonecondesation=req.query.bonecondesation;
	var tensionfreeflap=req.query.tensionfreeflap;
	var pediclegraft=req.query.pediclegraft;
	var flapdehiscence=req.query.flapdehiscence;
	var aprfused=req.query.aprfused;
	var typeofsuturing=req.query.typeofsuturing;
	var Grafted=req.query.Grafted,radioGrafted="";
	if(Grafted=="Grafted"){
		 radioGrafted="Grafted*"+req.query.radioGrafted;
		 radioGrafted=radioGrafted+req.query.grafttext;
	}
	else{
		radioGrafted="No graft";
	}
	var mesh=req.query.mesh;
	var ridge=req.query.ridge;
	var ridge_aug0=req.query.ridge_aug0;
	var ridge_aug1=req.query.ridge_aug1;
	var sinusamount=req.query.sinusamount;
	var direct_sinus=req.query.direct_sinus;
	var indirect_sinus=req.query.indirect_sinus;
	var nerve_repositioning=req.query.nerve_repositioning;
	var six_months=req.query.six_months;
	var quality_of_graft=req.query.quality_of_gratf;
	var quantity_of_graft=req.query.quantity_of_graft;
	var morbidity=req.query.morbidity;
	var bleed=req.query.bleed;
	var socket=req.query.socket;
	var socketcheck=req.query.socketcheck;
	if(socketcheck!="yes")
		socketcheck=""
	var Root_length=req.query.Root_length;
	var Root_width=req.query.Root_width;
	var Thickness_of_sheild=req.query.Thickness_of_sheild;
	var Condition_of_adjacent_tooth=req.query.Condition_of_adjacent_tooth;
	var Connective_tissuegraft=req.query.Connective_tissuegraft;
	var Free_gingival_graft=req.query.Free_gingival_graft;
	var density=req.query.density,densityres="";
	if(density!=undefined){
		if(typeof(density)=="string") densityres=density;
		else
	 for(var i=0;i<density.length;i++) {
		if(i!=0)
		  densityres=densityres+"*"+density[i];
		else
			densityres=density[i];
	}
	densityres=densityres+"*"+req.query.densitytext;
	}
	var notes=req.query.Surgicalnotes;
	var testquery="select * from intraoperation_details where op_number='"+op_number+"'";
	connection.query(testquery,function(err,data){
	})
	var quer9="delete from intraoperation_details where op_number='"+op_number+"'";
	var quer3="insert into intraoperation_details values('"+ implantres +"','" + flaptear + "','" + bonedehiscenceres+ "','" + siteres + "','" + dehiscene + "','" + sinus + "','" + membrane + "','" + nasal + "','" + fossares + "','" + nerveres+ "','" +intrableedres+ "','" +sixmonths+ "','" +oneyear+ "','" +threeyears+ "','" +fiveyears+ "','" +tenyears+ "','" +implantstabilityres+ "','" +implantdiameterres+ "','" +implantlengthres+ "','" +implantplaced+ "','" +buccalcortical+ "','" +corticalplate+ "','" +implantsinus+ "','" +spinningofimplant+ "','" +reservedsocket+ "','" +nutrientcanal+ "','" +excessivebleeding+ "','" +drill+ "','" +ridgesplit+ "','" +steppedosteotomy+ "','" +piezotips+ "','" +bonetap+ "','" +countersink+ "','" +bonecondesation+ "','" +tensionfreeflap+ "','" +pediclegraft+ "','" +flapdehiscence+ "','" +aprfused+ "','" +typeofsuturing+ "','" +radioGrafted+ "','" +mesh+ "','" +ridge+ "','" +ridge_aug0+ "','" +ridge_aug1+ "','" +sinusamount+ "','" +direct_sinus+ "','" +indirect_sinus+ "','" +nerve_repositioning+ "','" +six_months+ "','" +quality_of_graft+ "','" +quantity_of_graft+ "','" +morbidity+ "','" +bleed+ "','" +socket+ "','" +Root_length+ "','" +Root_width+ "','" +Thickness_of_sheild+ "','" +Condition_of_adjacent_tooth+ "','" +Connective_tissuegraft+ "','" +Free_gingival_graft+"','"+densityres+"','"+socketcheck+"','"+notes+"','"+op_number+"')";
	connection.query(quer9, function (err, result) {
	    	if (err) res.render('errorpage',{result:err});
	    	connection.query(quer3, function (err, result) {
	    	if (err) res.render('errorpage',{result:err});
	    		 res.redirect('/DetailsByOpnumSubmit/'+op_number);
	  		});
	}); 
})
	
    
app.get('/post_save',function(req,res){
    // updation into postoperation details
	var fractureimp=req.query.fractureimp;
	var infection=req.query.infection;
	var excess=req.query.excess;
	var excessinsertion=req.query.excessinsertion;
	var temporaryrestoration=req.query.temporaryrestoration;
	var loadingprotocol=req.query.loadingprotocol;
	var prosthesis=req.query.prosthesis+"*"+req.query.prosthesis1;
	var materialofprosthesis=req.query.materialofprosthesis;
	var abutment=req.query.abutment;
	var swell=req.query.swell;
	var pain=req.query.pain;
	var infectionone=req.query.infectionone;
	var fistula=req.query.fistula;
	var softtissue=req.query.softtissue;
	var paresthesia=req.query.paresthesia;
	var implantfail=req.query.implantfail;
	var boneloss=req.query.boneloss;
	var infectmonth=req.query.infectmonth;
	var swellmonth=req.query.swellmonth;
	var paresthesiamonth=req.query.paresthesiamonth;
	var bonelossmonth=req.query.bonelossmonth;
	var status3=req.query.status3;
	var screw6=req.query.screw6;
	var implantfail6=req.query.implantfail6;
	var fracture6=req.query.fracture6;
	var screwfracture6=req.query.screwfracture6;
	var prosthesis6=req.query.Prothesis6;
	var prosthesisfracture6=req.query.prosthesisfracture6;
	var crestal6=req.query.crestal6;
	var mobility6=req.query.mobility6;
	var gingival6=req.query.gingival6;
	var ballgingival6=req.query.ballgingival6;
	var peri6=req.query.peri6;
	var status1=req.query.status1;
	var implant1=req.query.implant1;
	var mobility1=req.query.mobility1;
	var loosening1=req.query.loosening1;
	var implantfail1=req.query.implantfail1;
	var fracture1=req.query.fracture1;
	var screwfracture1=req.query.screwfracture1;
	var Prosthesis1=req.query.Prosthesis1;
	var prosthesisfracture1=req.query.prosthesisfracture1;
	var crestal1=req.query.crestal1;
	var gingival1=req.query.gingival1;
	var ballgingival1=req.query.ballgingival1;
	var peri1=req.query.peri1;
	var discolor1=req.query.discolor1;
	var op_number=req.session.op_number;
	var notes=req.query.Surgicalnotes;
	var quer9="delete from postoperation_details where op_number='"+op_number+"'";  
	var quer5 = "insert into postoperation_details values('"+fractureimp+"','" +infection+"','" +excess+"','" +excessinsertion+"','" +temporaryrestoration+"','" +loadingprotocol+"','" +prosthesis+"','" +materialofprosthesis+"','" +abutment+"','" +swell+"','" +pain+"','" +infectionone+"','" +fistula+"','" +softtissue+"','" +paresthesia+"','" +implantfail+"','" +boneloss+"','" +infectmonth+"','" +swellmonth+"','" +paresthesiamonth+"','" +bonelossmonth+"','" +status3+"','" +screw6+"','" +implantfail6+"','" +fracture6+"','" +screwfracture6+"','" +prosthesis6+"','" +prosthesisfracture6+"','" +crestal6+"','" +mobility6+"','" +gingival6+"','" +ballgingival6+"','" +peri6+"','" +status1+"','" +implant1+"','" +mobility1+"','" +loosening1+"','" +implantfail1+"','" +fracture1+"','" +screwfracture1+"','" +Prosthesis1+"','" +prosthesisfracture1+"','" +crestal1+"','" +gingival1+"','" +ballgingival1+"','" +peri1+"','" +discolor1+"','"+notes+"','"+op_number+"')";
	connection.query(quer9, function (err, result) {
	    	if (err) res.render('errorpage',{result:err});
	    	connection.query(quer5, function (err, result) {
	    	if (err) res.render('errorpage',{result:err});
	    		res.redirect('/DetailsByOpnumSubmit/'+op_number);
	  		});
	}); 
})


app.get('/s',function(req,res){
	res.render('selected_query',{})
})


app.get('/fetchDetails',function(req,res){
	var resArr=[]
	var postspcl={"po1":"","po2":"","po3":"","po4":""}
	var postres=req.query.po; 	
	//console.log(postres)
	var f=0
	var post_query
	if(postres!=undefined){
		post_query="select op_number from postoperation_details where ";
		if(typeof(postres)== "string"){
			if(postres in postspcl){
				post_query=post_query+postres+" LIKE '_%'"

			}else{
				post_query=post_query+postres+"='"+req.query[postres]+"'"
			}
		}
		else{
			for(var i=0;i<postres.length;i++){
				if(i!=postres.length-1){
					if(postres[i] in postspcl){
						post_query=post_query+postres[i]+" LIKE '_%' and "
					}else{
					 	post_query=post_query+postres[i]+"='"+req.query[postres[i]]+"' and ";
					}
				}else{ 
					if(postres[i] in postspcl){
						post_query=post_query+postres[i]+" LIKE '_%'"
					}else{
						post_query=post_query+postres[i]+"='"+req.query[postres[i]]+"'";
					}
				}
			}
		}
		console.log(post_query)
	}else{
		post_query = "select op_number from postoperation_details";
	}
	var intraspcl={"io21":"","io22":"","io23":"","io24":"","io25":"","io26":"","io27":"","io28":"","io29":"","io30":"","io31":"","io32":"","io33":"","io34":"","socketcheck":""}
	var intrares=req.query.io; 	
	//console.log("..........................................."+intrares)
	var intra_query=""
	if(intrares!=undefined){
		intra_query="select op_number from intraoperation_details where ";
		if(typeof(intrares)== "string"){
			if(intrares in intraspcl){
				intra_query=intra_query+intrares+" LIKE '_%'"

			}else{
				intra_query=intra_query+intrares+"='"+req.query[intrares]+"'"
			}
		}
		else{
			for(var i=0;i<intrares.length;i++){
				if(i!=intrares.length-1) {
					if(intrares[i] in intraspcl){
						intra_query=intra_query+intrares[i]+" LIKE '_%' and "
					}else{
						intra_query=intra_query+intrares[i]+"='"+req.query[intrares[i]]+"' and ";
					}
				}
				else {
					if(intrares[i] in intraspcl){
						intra_query=intra_query+intrares[i]+" LIKE '_%'"
					}else{
						intra_query=intra_query+intrares[i]+"='"+req.query[intrares[i]]+"'";
					}
				}
			}
		}
		console.log(intra_query)
		
	}else{
		intra_query = "select op_number from intraoperation_details";
	}

	var preres=req.query.pr;
	var prespcl={"pr15":"","pr16":"","pr17":"","pr8":"","pr40":""}	
	var flag = "pr15" in prespcl
	var pre_query=""
	if(preres!=undefined){
		pre_query="select op_number from preoperation_details where ";
		if(typeof(preres)== "string"){
			if(preres in prespcl){
				pre_query=pre_query+preres+" LIKE '_%'"

			}else{
			pre_query=pre_query+preres+" LIKE '"+req.query[preres]+"%'"
			}
		}
		else{
			for(var i=0;i<preres.length;i++){

				if(i!=preres.length-1) {
					if(preres[i] in prespcl){
						pre_query=pre_query+preres[i]+" LIKE '_%' and "
					}else{
						pre_query=pre_query+preres[i]+" LIKE '"+req.query[preres[i]]+"%' and ";
					}
				}else {
					if(preres[i] in prespcl){
						pre_query=pre_query+preres[i]+" LIKE '_%'"
					}else{
						pre_query=pre_query+preres[i]+" LIKE '"+req.query[preres[i]]+"%'";
					}
				}
			}
		}
	}else{
		pre_query = "select op_number from preoperation_details";
	}

	var main_query = pre_query+";"+intra_query+";"+post_query;
	console.log(main_query)
	connection.query(main_query, function (err, main_result,fields) {
			if(err) {
				res.render('errorpage',{result:err});
				console.log(err)
			}
			var preArr=[]
			var postArr=[]
			var intraArr=[]
			if(main_result.length>0){
				for(var i=0;i<main_result[0].length;i++)
					preArr.push(main_result[0][i]['op_number'])
				for(var i=0;i<main_result[1].length;i++)
					intraArr.push(main_result[1][i]['op_number'])
				for(var i=0;i<main_result[2].length;i++)
					postArr.push(main_result[2][i]['op_number'])
				if(preArr.length!=0 && postArr.length!=0 && intraArr.length!=0){
					for(var i=0;i<preArr.length;i++){
						var ele = preArr[i]
						for(var j=0;j<intraArr.length;j++){
							if(ele==intraArr[j]){
								for(var k=0;k<postArr.length;k++){
									if(ele == postArr[k]){
										resArr.push(ele)
									}
								}
							}
						}
					}
				}
		}else{
			//console.log("No data found !!!!!!!!!")
		}	
		//console.log(resArr)
		if(resArr.length!=0){
			var patientquery="select op_number,name from patient_details where op_number in ("+resArr+")";
			connection.query(patientquery,function(err,data1){
			if(err){
				res.render('errorpage',{result:err});
				// res.send(err);
				//res.send("error in executing patientquery")
			}
			else{
				if(data1.length>0){
					//res.send(data1)
					res.render('fetch_details',{result:data1})
				}
				else
					res.render('nodata',{})
			}
		})
		}	
		else{
			res.render('nodata',{})
			// res.send("NO DATA PRESENT WITH GIVEN DETAILS")
		}
		
	});
})


app.get('/PreQuery/:op_num',function(req,res){
	var query="select * from preoperation_details where op_number='"+req.params.op_num+"'";
	//console.log("before connection in pre")
	connection.query(query,function(err,data){
		//console.log("after connection in pre")
		if(err)
			res.render('errorpage',{result:err});
		if(data.length>0){
			//console.log("during print")
			res.render('PreQuery',{pre_res:data});
		}
	})
	//console.log("afetr connection  outside  in pre")
})

app.get('/IntraQuery/:op_num',function(req,res){
	var query="select * from intraoperation_details where op_number='"+req.params.op_num+"'";
	connection.query(query,function(err,data){
		if(err)
			res.render('errorpage',{result:err});
		if(data.length>0)
			res.render('IntraQuery',{intra_res:data});
	})
})

app.get('/PostQuery/:op_num',function(req,res){
	var query="select * from postoperation_details where op_number='"+req.params.op_num+"'";
	connection.query(query,function(err,data){
		if(err)
			res.render('errorpage',{result:err});
		if(data.length>0)
			res.render('PostQuery',{post_res:data});
	})
})

app.listen(3000, function(){
	//console.log('Hey I am Running!..')
})