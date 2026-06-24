(function(){
  // Mobile nav
  var toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
  if(toggle&&nav){toggle.addEventListener('click',function(){nav.classList.toggle('open')});}

  // Sticky header shadow
  var header=document.querySelector('.site-header');
  if(header){
    var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>10)};
    window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  }

  // Portfolio filter
  var filterBtns=document.querySelectorAll('.filter-bar button');
  var projects=document.querySelectorAll('[data-cat]');
  filterBtns.forEach(function(b){
    b.addEventListener('click',function(){
      filterBtns.forEach(function(x){x.classList.remove('active')});
      b.classList.add('active');
      var f=b.dataset.filter;
      projects.forEach(function(p){
        p.style.display=(f==='all'||p.dataset.cat===f)?'':'none';
      });
    });
  });

  // Lightbox
  var lb=document.getElementById('lightbox');
  if(lb){
    var lbImg=lb.querySelector('img');
    document.querySelectorAll('.project').forEach(function(p){
      if(p.tagName==='A')return; // anchored projects navigate to detail pages
      p.addEventListener('click',function(){
        var img=p.querySelector('img');if(!img)return;
        lbImg.src=img.src;lbImg.alt=img.alt;lb.classList.add('open');
        document.body.style.overflow='hidden';
      });
    });
    var close=function(){lb.classList.remove('open');document.body.style.overflow=''};
    lb.addEventListener('click',close);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }

  // Form validation + success
  var forms=document.querySelectorAll('form[data-lead]');
  forms.forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var ok=true;
      f.querySelectorAll('[required]').forEach(function(field){
        var wrap=field.closest('.field');var v=field.value.trim();
        var valid=!!v;
        if(field.type==='email')valid=valid&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
        if(field.type==='tel')valid=valid&&v.replace(/\D/g,'').length>=10;
        wrap.classList.toggle('error',!valid);if(!valid)ok=false;
      });
      if(!ok){f.querySelector('.field.error input,.field.error select,.field.error textarea')?.focus();return}
      // TODO: wire to real endpoint (e.g. POST /api/lead)
      var s=f.querySelector('.form-success');
      if(s){s.classList.add('show');s.scrollIntoView({behavior:'smooth',block:'center'});}
      f.reset();
    });
    f.querySelectorAll('input,select,textarea').forEach(function(field){
      field.addEventListener('input',function(){field.closest('.field')?.classList.remove('error')});
    });
  });

  // Mark active nav by URL
  var path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav a').forEach(function(a){
    var href=a.getAttribute('href');
    if(href===path||(path===''&&href==='index.html'))a.classList.add('active');
  });
})();
