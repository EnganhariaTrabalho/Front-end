// Métodos de pegar o ID.

let ID = null;

export const getId = () => localStorage.getItem(ID);

// Métodos de setar o id form.
export const setId = id => {
	localStorage.setItem(ID,id);
};