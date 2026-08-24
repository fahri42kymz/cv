import { Hero } from './components/hero/Hero'
import { Nav } from './components/Nav'
import { Loader } from './components/Loader'
import styles from './App.module.css'

export default function App() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />

        {/* ── ABOUT SECTION ── */}
        <section id="about" className={styles.placeholderSection}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.kicker}>Hakkımda</span>
              <h2 className={styles.sectionTitle}>
                Teknolojiye, tasarıma ve<br />sürekli gelişime odaklı.
              </h2>
            </div>
            <div className={styles.aboutContent}>
              <p>
                Necmettin Erbakan Üniversitesi Ereğli Kemal Akman Meslek Yüksekokulu Bilgisayar Programcılığı bölümünde eğitim aldım. Eğitim sürecimde ve bireysel çalışmalarımda Visual Basic, HTML, CSS, JavaScript ve SQL teknolojileriyle çalıştım. 
              </p>
              <p>
                Algoritma ve programlama mantığı konusunda temel-orta düzey bilgiye sahibim; bir problemin çözüm adımlarını oluşturma, yazılımın çalışma mantığını planlama ve ihtiyaçları teknik olarak ifade etme konusunda kendimi geliştirmeye devam ediyorum. SQL ve ilişkisel veritabanları tarafında sorgu oluşturma, veri ekleme, güncelleme, tablo ilişkileri ve temel veritabanı işlemleri konusunda deneyim sahibiyim.
              </p>
              <p>
                Geliştirme süreçlerinde yapay zekâ destekli araçlardan aktif olarak yararlanıyorum. Yapay zekâyı kodlama, hata analizi, araştırma, çözüm geliştirme ve proje süreçlerini hızlandırmak amacıyla kullanıyor; ihtiyacımı doğru şekilde tanımlama ve ortaya çıkan çözümleri projeye uygun şekilde yönlendirme konusunda kendimi geliştiriyorum.
              </p>
            </div>
          </div>
        </section>

        {/* ── PROJECTS SECTION ── */}
        <section id="work" className={styles.placeholderSection}>
          <div className={styles.shell}>
            <div className={styles.sectionHead}>
              <span className={styles.kicker}>Projeler</span>
              <h2 className={styles.sectionTitle}>
                Anlaşılır, hızlı ve amaca yönelik<br />tasarlanmış sistemler.
              </h2>
            </div>
            
            <div className={styles.projectGrid}>
              {/* Project 1: Web */}
              <div className={styles.projectCard}>
                <div className={styles.projectVisual}>
                  <div className={styles.visualDefault}>
                    <img className={`${styles.slideImage} ${styles.img1}`} src={`${import.meta.env.BASE_URL}projects/web1.jpg`} alt="Web UI" />
                    <img className={`${styles.slideImage} ${styles.img2}`} src={`${import.meta.env.BASE_URL}projects/web2.jpg`} alt="Web UI" />
                    <img className={`${styles.slideImage} ${styles.img3}`} src={`${import.meta.env.BASE_URL}projects/web3.jpg`} alt="Web UI" />
                  </div>
                  <div className={styles.visualCode}>
<pre><code>{`function WebInterface() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/v1/dashboard')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <DashboardLayout data={data} />
  );
}`}</code></pre>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3>Modern Web Uygulaması</h3>
                  <p>Kullanıcı dostu, hızlı ve responsive arayüz tasarımları.</p>
                </div>
              </div>

              {/* Project 2: ERP */}
              <div className={styles.projectCard}>
                <div className={styles.projectVisual}>
                  <div className={styles.visualDefault}>
                    <img className={`${styles.slideImage} ${styles.img1}`} src={`${import.meta.env.BASE_URL}projects/erp1.jpg`} alt="ERP UI" />
                    <img className={`${styles.slideImage} ${styles.img2}`} src={`${import.meta.env.BASE_URL}projects/erp2.jpg`} alt="ERP UI" />
                    <img className={`${styles.slideImage} ${styles.img3}`} src={`${import.meta.env.BASE_URL}projects/erp3.jpg`} alt="ERP UI" />
                  </div>
                  <div className={styles.visualCode}>
<pre><code>{`public class ERPModule {
  public Inventory SyncStock(Item i) {
    if (i.Stock < i.Minimum) {
      AlertManager.Trigger(
        "Low Stock", i.Id
      );
    }
    return Database.Save(i);
  }
}`}</code></pre>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3>Kurumsal ERP & Yönetim</h3>
                  <p>İş süreçlerini hızlandıran modüler yazılım çözümleri.</p>
                </div>
              </div>

              {/* Project 3: SQL */}
              <div className={styles.projectCard}>
                <div className={styles.projectVisual}>
                  <div className={styles.visualDefault}>
                    <img className={`${styles.slideImage} ${styles.img1}`} src={`${import.meta.env.BASE_URL}projects/sql1.jpg`} alt="SQL Server" />
                    <img className={`${styles.slideImage} ${styles.img2}`} src={`${import.meta.env.BASE_URL}projects/sql2.jpg`} alt="SQL Database" />
                    <img className={`${styles.slideImage} ${styles.img3}`} src={`${import.meta.env.BASE_URL}projects/sql3.jpg`} alt="SQL Architecture" />
                  </div>
                  <div className={styles.visualCode}>
<pre><code>{`SELECT 
  u.department,
  COUNT(o.id) as total_orders,
  SUM(o.amount) as revenue
FROM users u
INNER JOIN orders o 
  ON u.id = o.user_id
WHERE o.status = 'COMPLETED'
GROUP BY u.department;`}</code></pre>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3>Veritabanı Mimari & SQL</h3>
                  <p>Güvenli veri saklama, ilişkisel yapı ve hızlı sorgular.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className={`${styles.placeholderSection} ${styles.contactSection}`}>
          {/* Background Bubbles for Contact Section */}
          <div className={styles.contactBubbles} aria-hidden="true">
            <div className={`${styles.bubble} ${styles.bubble1}`} />
            <div className={`${styles.bubble} ${styles.bubble2}`} />
            <div className={`${styles.bubble} ${styles.bubble3}`} />
            <div className={`${styles.bubble} ${styles.bubble4}`} />
            <div className={`${styles.bubble} ${styles.bubble5}`} />
            <div className={`${styles.bubble} ${styles.bubble6}`} />
            <div className={`${styles.bubble} ${styles.bubble7}`} />
            <div className={`${styles.bubble} ${styles.bubble8}`} />
            <div className={`${styles.bubble} ${styles.bubble9}`} />
            <div className={`${styles.bubble} ${styles.bubble10}`} />
          </div>

          <div className={`${styles.shell} ${styles.contactShell}`}>
            <div className={styles.contactPanel}>
              <h2 className={styles.contactTitle}>
                Harika bir şeyler<br />inşa edelim.
              </h2>
              <p className={styles.contactDesc}>
                Serbest projeler, tam zamanlı roller ve ilginç iş birlikleri için müsaitim.
              </p>
              <div className={styles.contactActions}>
                <div className={styles.socialLinks}>
                  <a href="https://www.linkedin.com/in/fahri-kaymaz-53b57941b/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="https://github.com/fahri42kymz?tab=repositories" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                  <a href="https://www.instagram.com/fahrikymz/" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.shell} ${styles.footerRow}`}>
          <span>© 2026 Fahri Kaymaz</span>
          <span>Yazılım Geliştiricisi</span>
        </div>
      </footer>
    </>
  )
}
