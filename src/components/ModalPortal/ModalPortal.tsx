'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalPortal = ({ children }: { children: React.ReactNode }) => {
    const portalRootRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        portalRootRef.current = document.querySelector('#modal-portal');
        setMounted(true);
    }, []);

    return mounted && portalRootRef.current
        ? createPortal(<>{children}</>, portalRootRef.current)
        : null;
};
