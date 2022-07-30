const fs = require('fs');

class Container{
    constructor(nameFile){
        this.nameFile = nameFile;
        
    }

    async getAll(){
        const products = await fs.promises.readFile(`db/${this.nameFile}`,'utf-8');
        const arrProducts = products.split(' ');
        const arrObjectProducts = arrProducts.map( (prod,idx) => {
          if( idx != arrProducts.length - 1){
              return JSON.parse(prod); 
          }
      } );
      return arrObjectProducts;
    }
    async save( object ){
        const arrProducts = await this.getAll();
        let id = null;

        if( arrProducts.length > 1 ){
            // menos 2 ya que el espacio lo convierte a undefined en products.split(' ')
            if( arrProducts[ arrProducts.length - 2 ].hasOwnProperty('id') ){
                id = arrProducts[ arrProducts.length - 2 ].id + 1;
            }else{
                id = 1;
            }
        }else{
            id = 1
        }
        const newObject = {
            id,    
            ...object
        }
        const stringObject = JSON.stringify(newObject)+ ' ';
        try {
          await fs.promises.appendFile( `db/${this.nameFile}`, stringObject )  

        } catch (error) {
            console.log(error);
        }
        return id;
    }
    async getById(id){
        try {
            const arrProducts = await this.getAll();
            const indexProduct = arrProducts.findIndex( product => product.id == id );
            return arrProducts[indexProduct] || null;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        const arrProducts = await this.getAll();
        const arrProductsWithoutUndefined = arrProducts.slice(0, arrProducts.length - 1);
        const newArr = arrProductsWithoutUndefined.filter( product => product.id != id );
        let toString = '';

        for( let prod of newArr ){
            toString += `${JSON.stringify(prod)} `;
        }
        await fs.promises.writeFile(`db/${this.nameFile}`, toString);
    }
    async deleteAll(){
        await fs.promises.writeFile(`db/${this.nameFile}`, '');

    }
}

module.exports = Container;