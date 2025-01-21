import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MarkdownDetail from '../src/components/MarkdownDetail'
import * as api from '../src/services/api'

const mockDetailData = {
    slug: 'terms',
    content: '# Heading\nThis is a markdown content.',
}

// fetchMarkdownDetail をモック化
vi.spyOn(api, 'fetchMarkdownDetail').mockResolvedValue(mockDetailData)

describe('MarkdownDetail Component', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    it('指定slugのMarkdownが表示されること', async () => {
        render(
            <MemoryRouter initialEntries={['/detail/terms']}>
                <Routes>
                    <Route path="/detail/:slug" element={<MarkdownDetail />} />
                </Routes>
            </MemoryRouter>,
        )

        await waitFor(() => {
            // マークダウン本文から変換されたHeadingが存在するか
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(screen.getByText('Heading')).toBeInTheDocument()
            // スラッグ名が画面上に表示されるか
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(screen.getByText(/Detail: terms/i)).toBeInTheDocument()
        })
    })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    it('エラー時にはエラーメッセージが表示されること', async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        (api.fetchMarkdownDetail as vi.Mock).mockRejectedValueOnce(new Error('Failed'))
        render(
            <MemoryRouter initialEntries={['/detail/privacy']}>
                <Routes>
                    <Route path="/detail/:slug" element={<MarkdownDetail />} />
                </Routes>
            </MemoryRouter>,
        )

        await waitFor(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            expect(screen.getByText(/エラー:/)).toBeInTheDocument()
        })
    })
})
