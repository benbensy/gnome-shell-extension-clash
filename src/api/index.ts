import { Soup } from '@girs/soup-3.0'

export async function request(url: string) {
    const session = new Soup.Session()
    const message = Soup.Message.new('GET', url)
    session.send(message)
}
