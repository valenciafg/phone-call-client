import Activedirectory from 'activedirectory'
const config = { url: 'ldap://172.24.10.10',
               baseDN: 'dc=plazameru,dc=com',
               username: 'appmeru@plazameru.com',
               password: '1111'
            }
const domainSufix = '@plazameru.com'
var ad = new ActiveDirectory(config);

const authUser = (user,password) => {
    userlogin = user + domainSufix
    ad.authenticate(userlogin, password, function(err, auth) {
        if (err) {
            console.log('ERROR: '+JSON.stringify(err))
            return false
        }  
        if (auth) {
            console.log('Authenticated!')
            return true;
        }else {
            console.log('Authentication failed!')
            return false
        }
    })
}