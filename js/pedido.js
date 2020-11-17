const carrito=document.getElementById('shopping-cart');
const productos=document.getElementById('products');
const listaProductos=document.querySelector('#list-cart');
const buyAllCartBtn=document.getElementById('buy-all-btn');

var products=[
        {
            id:1,
            image: "img/productos/index-1.jpg",
            name: "Pozole de hate", 
            desc: "producto perron prueba de descripcion",
            price: 12,
            stock: 2
        },
        {
            id:2,
            image: "img/productos/index-2.jpg",
            name: "Mneudo con cebolla", 
            desc: "producto perron probando a ver como se lee",
            price: 30,
            stock: 4
            
        },
        {
            id:3,
            image: "img/productos/index-3.jpg",
            name:"Comida china de dubai", 
            desc: "producto perron probando otra vez a ver como se ve la descripción",
            price: 199,
            stock: 19
        },
        {
            id:4,
            image: "img/productos/index-4.jpg",
            name:"Maluma con J Balvin", 
            desc: "producto perron que no es una comida prueba de descipción",
            price: 199,
            stock: 19
        },
        {
            id:5,
            image: "img/productos/index-5.jpg",
            name:"Venezolano cocido de", 
            desc: "producto perron pero cocido de venezolano wtf",
            price: 199,
            stock: 0
        },
    ];

loadEventL();
recoverLocalStorageCart();

function loadEventL(){
    //crear productos
    createProducts();
    
    //comprar producto
    productos.addEventListener('click', comprarProducto);
    
    //eliminar producto de carrito
    carrito.addEventListener('click', deleteProduct);
    
    //comprar todo el carrito
    buyAllCartBtn.addEventListener('click', buyAllCart);
}

function createProducts(){
    for(var i=0; i<products.length; i++){
        if(products[i].stock>0){
          const productShow=document.createElement('div');
            
            productShow.innerHTML=`
            <img src="${products[i].image}"></img>
            <h3>${products[i].name}</h3>
            <p>${products[i].desc}</p>
            <h4>Precio: ${products[i].price}</h4>
            <span style="width: 100%; height: 20px; float: left; text-align: center">Disponibles: ${products[i].stock}</span><br>
            <a href="#" class="add-cart" style="background-color: #346F7B; border-radius: 3px; font-size: 20px; padding: 3px; text-align: center; text-decoration: none; color: black; margin: 0; display: block" data-id="${products[i].id}">Agregar al carrito</a>
            `;
            productos.appendChild(productShow);
        }else{
            const productShow=document.createElement('div');
            
            productShow.innerHTML=`
            <img src="${products[i].image}"></img>
            <h3>${products[i].name}</h3>
            <p>${products[i].desc}</p>
            <h4>Precio: ${products[i].price}</h4>
            <span style="width: 100%; height: 20px; float: left; text-align: center">Disponibles: ${products[i].stock}</span><br>
            <a href="#" class="disabled" style="background-color: #69696B; border-radius: 3px; font-size: 20px; padding: 3px; text-align: center; text-decoration: none; color: #B0B0B3; margin: 0; display: block" data-id="${products[i].id}">Agregar al carrito</a>
            `;
            productos.appendChild(productShow);     
        }
    }
}

function comprarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('add-cart')){
        const producto=e.target.parentElement;        
        leerDatosProducto(producto);
    }
    
}
    
function leerDatosProducto(producto){
    const infoProducto={
        image:producto.querySelector('img').src,
        name:producto.querySelector('h3').textContent,
        desc:producto.querySelector('p').textContent,
        price:producto.querySelector('h4').textContent,
        id:producto.querySelector('a').getAttribute('data-id'),
        cuantity: 1
    }
    
    let productsLS;
    productsLS=recoverLocalStorage();
    
    productsLS.forEach(function(productLS){
        if(productLS.id===infoProducto.id){
            productsLS=productLS.id;
        }
    });
    
    if(productsLS===infoProducto.id){
        alert("ya haz agregado este producto");
    }else{
        insertarCarrito(infoProducto);  
    }
}

function insertarCarrito(infoProducto){
    const rowProduct=document.createElement('tr');
    
    rowProduct.innerHTML=`
        <td></td>
        <td style="width: 100px">
            <img src="${infoProducto.image}" width=100px height=100px></img>
        </td>
        <td style="text-align: center">${infoProducto.name}</td>
        <td style="text-align: center">${infoProducto.desc}</td>
        <td style="text-align: center">${infoProducto.price}</td>
        <td style="text-align: center">${infoProducto.cuantity}</td>
        <td style="text-align: center">
            <a href="#" class="del-product" data-id="${infoProducto.id}" style="font-size: 30px; color: red; "><i class="fas fa-minus-circle"></i></a>
        </td>
        
    `;
    listaProductos.appendChild(rowProduct);
    addLocalStorage(infoProducto);
}

function recoverLocalStorage(){
    let products;
    
    if(localStorage.getItem('products')===null){
        products=[];
    }else{
        products=JSON.parse(localStorage.getItem('products'));
    }
    return products;
}

function addLocalStorage(infoProducto){
    let products;
    products=recoverLocalStorage();
    products.push(infoProducto);
    localStorage.setItem('products', JSON.stringify(products));
}

function recoverLocalStorageCart(){
    let products;
    
    products=recoverLocalStorage();
    products.forEach(infoProducto => {
        const rowProduct=document.createElement('tr');
    
    rowProduct.innerHTML=`
        <td></td>
        <td style="width: 100px">
            <img src="${infoProducto.image}" width=100px height=100px></img>
        </td>
        <td style="text-align: center">${infoProducto.name}</td>
        <td style="text-align: center">${infoProducto.desc}</td>
        <td style="text-align: center">${infoProducto.price}</td>
        <td style="text-align: center">${infoProducto.cuantity}</td>
        <td style="text-align: center">
            <a href="#" data-id="${infoProducto.id}" style="font-size: 30px; color: red; "><i class="fas fa-minus-circle"></i></a>
        </td>
        
    `;
    listaProductos.appendChild(rowProduct);
    });
}

function deleteProduct(e){
    e.preventDefault();
    let product, productID;
    
    if(e.target.classList.contains('fas')){
        e.target.parentElement.parentElement.remove();
        product=e.target.parentElement.parentElement;
        productID=product.querySelector('a').getAttribute('data-id');
    }
    deleteProductLocalStorage(productID);
}

function buyAllCart(e){
    e.preventDefault();
    
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild);
    }
    buyAllCartClear();
    return false;
}

function deleteProductLocalStorage(productID){
    let productsLS;
    productsLS=recoverLocalStorage();
    productsLS.forEach(function(productLS, index){
        if(productLS.id===productID){
            productsLS.splice(index,1);
        }
    });
    
    localStorage.setItem('products', JSON.stringify(productsLS));
}

function buyAllCartClear(){
    localStorage.removeItem('products');
}