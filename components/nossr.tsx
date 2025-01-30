"use client";
import dynamic from 'next/dynamic';

function NoSSR(props: { children: React.ReactNode }) {
  return <>{props.children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
