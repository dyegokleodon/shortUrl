import Url from '../models/Url';
import * as Yup from 'yup';

class UrlController{
  async codeUrl(req, res, next){
    const code = req.params.short_url;

    const resolve = await Url.findOne({where: {short_url: code}});
    if(!resolve){
      return res.status(404).json({error:'url não encontrada'});
    }
    return res.json(resolve.url);
  }

  async index(req, res) {
    const urls = await Url.findAll({
      where: {user_id: req.userId},
      attributes:['id', 'url', 'short_url', 'created_at'],
      order: ['created_at']
    });

    return res.json(urls);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      url: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      res.status(400).json({error: 'Falha na validação'})
    }

    function generateShortUrl() {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }

    const url = req.body.url;
    const short_url = generateShortUrl();

    const urlExists = await Url.findOne({where: { url: req.body.url, user_id: req.userId}});

    if(urlExists){
      return res.status(401).json({error:'Url Já utilizada por este usuário'})
    }

    const generateUrl = await Url.create({
      user_id: req.userId,
      url,
      short_url
    });

    return res.json(generateUrl.url);
  }
}

export default new UrlController();
