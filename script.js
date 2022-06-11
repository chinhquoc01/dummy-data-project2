import fetch from "node-fetch";
import { v4 as uuidv4 } from 'uuid';


let temp = await fetch('https://raw.githubusercontent.com/duyet/vietnamese-namedb/master/uit_member.json')
let nameObj = await temp.json()

let subject = ['Mỹ thuật', 'Âm nhạc', 'Thể dục', 'Tiếng Việt', 'Kỹ năng sống']

let address = ['Hoàn Kiếm', 'Đống Đa', 'Tây Hồ', 'Hai Bà Trưng', 'Cầu Giấy', 'Hoàng Mai', 'Nam Từ Liêm', 'Quốc Oai']

function randomCharacter(length) {
    var result           = '';
    var characters       = 'abcdefghiklmnopqrs1234567890';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function randomPhone(length) {
    var result           = '0';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
randomPhone(9);

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

function generateEmail(name) {
    let arr = name.split(' ')
    let email = ''
    email += removeVietnameseTones(arr[arr.length-1]) + '_' + randomCharacter(3) + '@gmail.com'
    return email.toLowerCase()
}
function generateAge(min = 20, max = 30) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

function generateDate(start, end, monthInput = null, dateInput = null) {
    let year = []
    for (let i = start; i <= end; i++) {
        year.push(i.toString())
        
    }
    let month = ['01', '02', '03', '04', '05', '06', '08', '09', '10', '11', '12']
    let date = []
    for (let i=1; i<=28; i++) {
        if (i<10) {
            date.push('0'+ i.toString())

        }else {
            date.push(i.toString())
        }
    }
    if (!monthInput) {
        return year[Math.floor(Math.random() * year.length)] + month[Math.floor(Math.random() * month.length)] + date[Math.floor(Math.random() * date.length)]

    } else if (dateInput < 10) {
        return year[Math.floor(Math.random() * year.length)] + monthInput.toString() + '0' + dateInput.toString()
    } else if (dateInput >= 10) {
        return year[Math.floor(Math.random() * year.length)] + monthInput.toString() + dateInput.toString()

    }
}

let teacher = []
function getTeacher(number = 50) {
    for (let i = 0; i < number; i++) {
        let random = Math.floor(Math.random() * nameObj.length)
        let row = `(uuid_generate_v4(), `
        row += `'` + subject[Math.floor(Math.random() * subject.length)] + `', `
        row += `'` + address[Math.floor(Math.random() * subject.length)] + `', `
        row += generateAge() + ', '
        row += `'` + nameObj[random].full_name + `', `
        row += `'` + generateEmail(nameObj[random].full_name) + `', `
        row += Math.floor(Math.random() * 2) + `, `
        row += `'` + randomPhone(9) + `'), `
        // console.log(row);
        teacher.push(row)
    }

}


let classIds = ['1755dc64-e739-4e7e-862e-c7938a089b10', 
'267312fe-c252-4a58-a748-acc68a5b085a', 
'4cab4674-e0f0-404d-b133-771e43b6b4d1', 
'99982b0a-23d5-44e5-a56d-4808c63f26d4',
'9d51122a-94ce-4d97-b6a7-ebe22625a6e6',
'a2470681-fbe0-4be7-b175-9fb1eb8f0469',
'b6d87dc8-e015-49f1-897e-be2a34df1d4a']

// INSERT INTO public.parent(
// 	parent_id, parent_age, parent_name, parent_address, parent_dob, parent_email, parent_gender)
// 	VALUES (?, ?, ?, ?, ?, ?, ?);

let parentIds = []
function getParent(number = 50) {
    parentIds = []
    for (let i = 0; i < number; i++) {
        let uuid = uuidv4()
        let random = Math.floor(Math.random() * nameObj.length)
        parentIds.push(uuid)
        let row = `('` + uuid + `', `
        row += generateAge(25, 35) + ', '
        row += `'` + nameObj[random].full_name + `', `
        row += `'` + address[Math.floor(Math.random() * subject.length)] + `', `
        row += `'` + generateDate(1987, 1997) + `', `
        row += `'` + generateEmail(nameObj[random].full_name) + `', `
        row += Math.floor(Math.random() * 2) + `),`
        // console.log(row);
    }
}
// getParent()

console.log('------------------------');
console.log('------------------------');
console.log('------------------------');
// INSERT INTO public.student(
// 	student_id, class_id, date_of_birth, parent_id, student_name, student_gender)
// 	VALUES (?, ?, ?, ?, ?, ?);
let childIds = []
function getChild(number = 50) {
    childIds = []
    for (let i = 0; i < number; i++) {
        let uuid = uuidv4()
        let random = Math.floor(Math.random() * nameObj.length)
        childIds.push(uuid)
        let row = `('` + uuid + `', `
        row += `'` + classIds[Math.floor(Math.random() * classIds.length)] + `', `
        row += `'` + generateDate(2017, 2020) + `', `
        row += `'` + parentIds[Math.floor(Math.random() * parentIds.length)] + `', `
        row += `'` + nameObj[random].full_name + `', `
        row += Math.floor(Math.random() * 2) + `),`
        // console.log(row);
    }
}
// getChild();

let tempStudentIds = [
'9cf8cbdd-e161-4dae-9d2f-aac7a425687d',
'fe520abf-2a22-43e2-854f-71d245ea97e6',
'f4d1d490-1390-4450-8dcf-6632d43b0cb0',
'33eef06b-71ea-48e1-a0e5-8d00cdb920ac',
'eca89774-b776-489b-9402-9a6f15aeb4c0',
'bb055055-6105-4de0-ac53-038e30519831',
'8afcdcd0-427c-403a-93aa-7cf63c3f4808',
'bde027a5-f56a-4eaf-820f-60a6bf3acb8a',
'725ae8fa-2afb-4a0b-9c97-fc4bf78f7924',
'1129826d-e120-45a0-907e-0cab67ebe77b',
'fe3dff04-50c1-4711-9d63-59658fba0200',
'c6b5a1ef-34c9-4ded-a9e5-dfc08b656800',
'372ad543-fe87-4250-bf8a-974dcfabaeac',
'379c9b9d-ac23-4bb8-9fa0-e00b282e400f',
'45a32402-6047-4bd0-af9a-a085b7a98d4e',
'90e99948-993f-4cc6-8534-9dcccd27caa7',
'c023421d-8234-4a27-bde1-1486b6071d0d',
'8ee03528-4147-45d5-be9e-4289b8401c9f',
'1eb2a591-db9c-4564-b8a7-f34a585cf87f',
'fa01007a-d46f-49b2-955d-cbc558ed228a',
'355913eb-de50-4869-b592-12fc42484396',
'f0a0da17-91ee-49a0-809a-2cf17b175665',
'20690f75-d8a6-41f2-b953-0577b1f7423e',
'c7da8c62-44a0-4e3a-aadb-4bb2684f033c',
'325b8869-d4e2-461f-9321-433b20d1bf28',
'd2ff1863-d4f7-46ce-b785-ad65ba1680d4',
'd2f02913-47fc-4128-ba8a-a90916f6bae4',
'96e31746-b411-4e27-ae15-19f58c1f506d',
'9d42b977-7efd-48f8-8c1c-28d6357239dd',
'45a2841a-15cc-450e-9765-319c010d692c',
'b5fe3e54-11a1-4459-b62c-f8ba23474291',
'cf9827c5-783b-412f-a2a2-a99fa7961511',
'e22c6b66-d30f-43a7-bf79-68cb2c053a0f',
'486ea4ca-f493-4c62-827f-19807007186f',
'957cdf8f-8b9f-46e8-8309-a4cdf22128b9',
'400bfda9-7d39-4782-bfe9-cc4d6687e8aa',
]

// INSERT INTO public.tuition(
// 	tuition_id, month, tuition_fee, student_id)
// 	VALUES (?, ?, ?, ?);
function getTuition () {
    for (let i = 0; i < tempStudentIds.length; i++) {
        let row = `(uuid_generate_v4(), ` 
        row += 6 + `, `
        row += generateAge(2500000, 3000000) + `,`
        row += `'` + tempStudentIds[i] + `'),`
        console.log(row);
    }
}
// getTuition()

// INSERT INTO public.food_menu(
// 	food_menu_id, date_food, food_list, breakfast_food_list, lunch_food_list, dinner_food_list)
// 	VALUES (?, ?, ?, ?, ?, ?);
const breakfast = ['Bánh bao', 'Xôi', 'Bánh rán', 'Bánh hấp', 'Bánh mì', 'Bún chả', 'Bún đậu']
const milk = ['Sữa Fami', 'Sữa Vinamilk socola', 'Sữa Vinamilk dâu', 'Sữa TH True Milk', 'Sữa Mộc Châu', 'Sữa chua']
const meat = ['Thịt lợn rang', 'Thịt lợn luộc', 'Thịt lợn xào', 'Thịt bò xào', 'Sườn xào chua ngọt', 'Gà rang muối', 'Gà luộc', 'Thịt viên chiên']
const vegetable = ['Rau muống luộc', 'Rau muống xào', 'Rau cải luộc', 'Rau cải xào', 'Bắp cải luộc', 'Bắp cải xào', 'Rau ngót luộc']
function getFoodMenu(month = null) {
    for (let i = 1; i<=30; i++) {
        let row = `(uuid_generate_v4(), ` 
        row += `'` + generateDate(2022, 2022, month, i) + `', `
        row += `null, `
        row += `'` + breakfast[Math.floor(Math.random() * breakfast.length)] + `, ` + milk[Math.floor(Math.random() * milk.length)] + `',`
        row += `'` + meat[Math.floor(Math.random() * meat.length)] + `, ` + vegetable[Math.floor(Math.random() * vegetable.length)] + `, ` + milk[Math.floor(Math.random() * milk.length)] + `',`
        row += `'` + meat[Math.floor(Math.random() * meat.length)] + `, ` + vegetable[Math.floor(Math.random() * vegetable.length)] + `'),`
        console.log(row);
    }
}
getFoodMenu('06')