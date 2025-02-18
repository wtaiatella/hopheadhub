import React from 'react';

export default function mainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center mx-auto max-w-5xl min-h-screen ">
      <div className="grid grid-cols-auth content-center rounded-lg shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}
