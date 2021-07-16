import bcrypt from 'bcrypt'

const encoder = {
  encode: (password) => {
    //生成salt的迭代次数
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    return bcrypt.hashSync(password, salt)
  }
}

export default encoder