import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 p-6">
      <section className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow">
          <span className="text-3xl font-bold">404</span>
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-2 text-gray-600">
          ขอโทษนะครับ/ค่ะ ไม่พบหน้าที่คุณต้องการ
        </p>

        <div className="mt-6">
          <Link
            to="/todolist"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-offset-2"
            aria-label="กลับไปหน้า Todolist"
          >
            {/* ← */}
            <span className="text-lg" aria-hidden>
              ←
            </span>
            <span>กลับไปหน้า /todolist</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
