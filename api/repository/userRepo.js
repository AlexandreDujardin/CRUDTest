export default (User) => {
  const users = [
    new User('9782744005083','Neveu' ,'Lucas' ,'1997-02-28','10 Passage du Havre 75009 Paris','0644629401','lucas.neveu@gmail.com'),
    new User('9782746035965','Cordier','Olivie-Élodie','1996-12-28','14 Rue du Docteur Heulin 75017 Paris','0757130420','olivieelodie.cordier@gmail.com')
  ];
  
  const listUsers = () => {
      return users;
    };

  const createUser = (user) => {
    users.push(new User(
      user.id,
      user.lastName,
      user.firstName,
      user.birthDate,
      user.address,
      user.phone,
      user.email,
    ));
    return user;
  }

  const findUser = (id) => {
    return users.find((user) => user.idUser === id);
  }

  const updateUser = (id, user) => {
    let foundUserIdx = 0;
    users.forEach((user, idx) => {
      if (user.idUser === id) {
        foundUserIdx = idx;
      } 
    });
    
    if (foundUserIdx > 0) {
      users[foundUserIdx] = new User(
        user.idUser,
        user.lastName,
        user.firstName,
        user.birthDate,
        user.address,
        user.phone,
        user.email,
      );
      return user;
    }
    return null;
  }

  const deleteUser = (id) => {
    let deletedUser = null;
    users.forEach((user, idx) => {
      if (user.idUser === id) {
        deletedUser = Object.assign({}, user);
        users.splice(idx, 1);
      }
    });
    return deletedUser;
  }

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
  };
};