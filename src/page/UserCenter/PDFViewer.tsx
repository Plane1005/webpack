import { Button } from 'antd'
import React, { useEffect, useState } from 'react'
//react预览pdf文件插件
import PDF from 'react-pdf-js'
import jianli from './jianli.pdf'
import test from './test.pdf'
import './style.less'

const PDFViewer = (props) => {
  const [page, setPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)

  //获取所有页
  const onDocumentComplete = (pages) => {
    setPages(pages)
  }
  //点击上一页
  const handlePrevious = () => {
    setPage(page-1)
  }
  //点击下一页
  const handleNext = () => {
    setPage(page+1)
  }

  return (
    <div className="flieContent">
      <div className="filePdf">
        <PDF
          file={test} //文件地址
          // file='/test/jianli.pdf' //文件地址
          onDocumentComplete={onDocumentComplete}
          page={page} //文件页码
        />
      </div>

      <div className='filePdfFooter'>
        {page === 1 ? null : (
          <Button type="primary" onClick={handlePrevious}>
            上一页
          </Button>
        )}

        <div className='filePdfPage'>
          <span>第{page}页</span>/<span>共{pages}页</span>
        </div>
        {page === pages ? null : (
          <Button style={{ marginLeft: '10px' }} type="primary" onClick={handleNext}>
            下一页
          </Button>
        )}
      </div>
    </div>
  )
}
export default PDFViewer
