
// تمرير سلس وتحقق بسيط لنموذج الاتصال
const form = document.querySelector('form[data-contact]');
if(form){
  form.addEventListener('submit', (e)=>{
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const msg = form.querySelector('[name="message"]').value.trim();
    if(!name || !email || !msg){
      e.preventDefault();
      alert('فضلاً أكمل الحقول المطلوبة.');
    }
  });
}
