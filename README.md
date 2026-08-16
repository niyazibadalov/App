# React Application - Feature-Based Architecture

Bu layihədə React və React Router istifadə edərək modul və genişləndirilə bilən bir veb tətbiqi hazırlamışam. Kodun idarəolunmasını və oxunaqlığını artırmaq üçün layihə strukturunu Feature-Based (xüsusiyyət əsaslı) arxitekturaya keçirmişəm.


## 🚀 Əsas Funksionallıqlar

* **İstifadəçi Yetkiləndirməsi (Auth):** AuthContext vasitəsilə qlobal sessiya idarəolunmasını və istifadəçinin daxil olub-olmamasını təmin etmişəm.
* **Qorunan Marşrutlar (Protected Routes):** Autentifikasiyadan keçməyən istifadəçilərin Dashboard səhifəsinə keçidini məhdudlaşdıran ProtectedRoute məntiqini tətbiq etmişəm.
* **Xətaların Tutulması (Error Boundary):** Tətbiqdə yaranan gözlənilməz xətaları tutmaq və tətbiqin çökməsinin qarşısını almaq üçün ErrorBoundary komponentindən istifadə etmişəm.
* **404 Not Found:** Yanlış marşrutlara daxil olduqda istifadəçini 404 səhifəsinə yönləndirmişəm.


## 📁 Qovluq Strukturu

Layihədəki bütün faylları öz funksionallıqlarına uyğun olaraq aşağıdakı kimi qruplaşdırmışam:

```text
src/
  assets/
  components/
    ErrorBoundary.jsx
    Navbar.jsx
  features/
    auth/
      AuthContext.jsx
      Login.jsx
      ProtectedRoute.jsx
    dashboard/
      BuggyComponent.jsx
      Dashboard.jsx
    home/
      Home.jsx
  pages/
    NotFound.jsx
  App.css
  App.jsx
  main.jsx