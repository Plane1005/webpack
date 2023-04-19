import React, { useEffect, useState } from 'react'
import Marked from '@/component/Markdown/jetMarkdown'
import { getNoticeList } from '@/service';

function mark() { 
  const [data, setData] = useState('');
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    if (id) {
      getNoticeList({ id }).then((res: any) => {
        setData(res[0].content)
      })
    }
  }, []);

  return (
    <div>
      <Marked data={data} />
    </div>
  )
}

export default mark
