import Swal from "sweetalert2"


export const popupServerError= ()=>{
    Swal.fire({
        title: '<strong> <u>Error de servidor intentelo más tarde</u></strong>',
        icon: 'warning',
        allowOutsideClick:false,
        focusConfirm: true,
        timer:2500,
        confirmButtonText:
          '<a href="/">OK</a>',
      }).then(()=>{window.location.href="/"})   
}