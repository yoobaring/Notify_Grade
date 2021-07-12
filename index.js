var puppeteer = require('puppeteer');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var lineNotify = require('line-notify-nodejs')('MODsSqv8a3DqzXo7OvZEj7E3WyFNeChyp5rdcz3O4Rn');
////////////////////////////////////////////////////////////////
 
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

(async () => {

    //////////////Config//////////////////

    var okurl = 'http://webportal.pkru.ac.th'
	const browser = await puppeteer.launch({headless: false});
    var context = await browser.createIncognitoBrowserContext();
    var page = await context.newPage();
    page.setDefaultTimeout(0);
    console.clear();
	console.log("Started...");

    
	let counttt = 0;
    let element;
        await page.goto(okurl+'/main-std/profile/profile.php', { waitUntil: 'networkidle2', timeout: 0 });
	let GradeNo = new Array();
	let ListId = new Array();
	let chlist = 0
	//console.log('++++CheckList++++ =', checklist)
	//console.log('++++ListId++++ =', ListId)

	while (true) {
		counttt = counttt + 1;
		console.log('+++LOOP+++ : '+counttt);

		try{					
			await page.goto(okurl+'/main-std/profile/profile.php', { waitUntil: 'networkidle2', timeout: 0 });
			var url = await page.url();

			if (url == okurl+'/index.php' || url == okurl || url == okurl+'/') {

				element = await page.$x(`//*[contains(@placeholder, "USER")]`);
				await element[0].click();

				element = await page.$x(`//*[contains(@placeholder, "USER")]`);
				await element[0].type(`xxxxxxxxxx`); // Username (รหัสนักศึกษา)

				element = await page.$x(`//*[contains(@type, "password")]`);
				await element[0].type(`xxxxxxxxxxxxx`); //password 

				element = await page.$x(`//button[contains(@type, "submit")]`);
				await element[0].click();
				console.log('Login....')
				await sleep(5000);
			}
			
			else if (url == okurl+'/main-std/profile/profile.php' || url == okurl+'/main-std/profile/profile') {
				try {
					console.log('OK1')
					await sleep(15000);
				//	let checklist = new Array();
				console.log('++++ChList++++ =', chlist)
				console.log('++++ListId++++ =', ListId)
					
					console.log('GradeNo', GradeNo == '', GradeNo)
                    const isBelowThreshold = (e) => e == chlist;
						if(GradeNo == '' && !ListId.some(isBelowThreshold)){
							for(let i=2; i<7; i++){
								let [ch] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${i}]/td[1]`)
								let ch1 = await ch.getProperty('textContent');
								let checklist = await ch1.jsonValue();
								chlist = i-1
								console.log('checklist', checklist)

															
								if(checklist != ''){
									let [GG] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${i}]/td[6]`)
									let GG1 = await GG.getProperty('textContent');
									let grade = await GG1.jsonValue();
									console.log('++++++++++++GRADE+++++++++++:  = ',grade);

									if(grade != ''){
									console.log('First')
									let [Y] = await page.$x(`//*[@id='activity']/h4[1]`)
									let Y1 = await Y.getProperty('textContent');
									let year = await Y1.jsonValue();
							
									let [ccode] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${i}]/td[2]`)
									let cccode = await ccode.getProperty('textContent');
									let cc = await cccode.jsonValue();
							
									let [sname] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${i}]/td[3]`)
									let ssname = await sname.getProperty('textContent');
									let ss = await ssname.jsonValue();
							
									let [professor] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${i}]/td[4]`)
									let pprofessor = await professor.getProperty('textContent');
									let pp = await pprofessor.jsonValue();
							
									let [credit] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${i}]/td[5]`)
									let ccredit = await credit.getProperty('textContent');
									let cd = await ccredit.jsonValue();
							
									let [sg] = await page.$x(`//ul[contains(@class, 'list-group list-group-unbordered')]//li[contains(@class, 'list-group-item')][5]`)
									let sg1 = await sg.getProperty('textContent');
									let sumgrade = await sg1.jsonValue();
									console.log(year, cc, ss, pp, cd, sumgrade )	
									ListId.push(i)	
									console.log(ListId, '+++FirstListID+++')				
										
									lineNotify.notify({
										message: '\n🔰🔰🔰🔰🔰🔰🔰🔰\n\n😎เกรดออกแล้ว🤖\n'+year+'\n👨🏻‍🎓'+'\n🍏รหัสวิชา: '+cc+'\n🍏ชื่อวิชา: '+ss+'\n🍏อาจารย์: '+pp+'\n🍏หน่วยกิต: '+cd+'\n🍏เกรด: '+grade+'\n=================\n'+sumgrade+'\n\n'
									}).then(() => {
										console.log('send completed!');
									});
									}
									else{
										GradeNo.push(i)
										console.log(GradeNo)
									}
								}

							}
					    }
					
						else{
				
							for(let k=0; k<GradeNo.length;k++){
								var [GG] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${GradeNo[k]}]/td[6]`)
								var GG1 = await GG.getProperty('textContent');
								var grade = await GG1.jsonValue();
								console.log('++++++++++++GRADE+++++++++++:  = ',grade);
							
									if(grade != ''){
									console.log('Secont')
									let [Y] = await page.$x(`//*[@id='activity']/h4[1]`)
									let Y1 = await Y.getProperty('textContent');
									let year = await Y1.jsonValue();
						
									let [ccode] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${GradeNo[k]}]/td[2]`)
									let cccode = await ccode.getProperty('textContent');
									let cc = await cccode.jsonValue();
						
									let [sname] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${GradeNo[k]}]/td[3]`)
									let ssname = await sname.getProperty('textContent');
									let ss = await ssname.jsonValue();
						
									let [professor] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${GradeNo[k]}]/td[4]`)
									let pprofessor = await professor.getProperty('textContent');
									let pp = await pprofessor.jsonValue();
						
									let [credit] = await page.$x(`//*[@id='activity']/table[1]/tbody[1]/tr[${GradeNo[k]}]/td[5]`)
									let ccredit = await credit.getProperty('textContent');
									let cd = await ccredit.jsonValue();
						
									let [sg] = await page.$x(`//ul[contains(@class, 'list-group list-group-unbordered')]//li[contains(@class, 'list-group-item')][5]`)
									let sg1 = await sg.getProperty('textContent');
									let sumgrade = await sg1.jsonValue();
									console.log(year, cc, ss, pp, cd, sumgrade)
									ListId.push(GradeNo[k])	
									console.log(ListId, '+++SecontListID+++')
									GradeNo.reverse();
									GradeNo.pop();
																				
									lineNotify.notify({
										message: '\n🔰🔰🔰🔰🔰🔰🔰🔰\n\n😎เกรดออกแล้ว🤖\n'+year+'\n👨🏻‍🎓'+'\n🍏รหัสวิชา: '+cc+'\n🍏ชื่อวิชา: '+ss+'\n🍏อาจารย์: '+pp+'\n🍏หน่วยกิต: '+cd+'\n🍏เกรด: '+grade+'\n=================\n'+sumgrade+'\n\n'
									}).then(() => {
										console.log('send completed!');
									});
									}
									console.log('OOOKKK')
									await sleep(15000);
							}
						    
						}	
					
				} catch (error) {
					console.error(error);
					console.log('Error.Chacking....');
					await sleep(10000);
					}
					console.log('OKOKOK....')
				 await sleep(5000);
			}
			
		}catch(error) {
				console.error(error);
				console.log('Login Error..');
				await sleep(3000);		
		}

    }
	console.log('End')
	await sleep(5000);
	await browser.close();

})().catch(error => { console.error(error);
    console.log('Main async Error..');
    process.exit(1); });
