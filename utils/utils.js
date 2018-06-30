module.exports = {
    decryptPassword: password => {
        return Buffer.from(password, 'base64').toString('ascii');
    }
};