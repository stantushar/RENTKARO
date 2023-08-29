package com.rentkaro.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_excceptions.CustomException;
import com.rentkaro.pojos.Product;
import com.rentkaro.pojos.User;
import com.rentkaro.repository.ProductRepository;
import com.rentkaro.repository.UserRepository;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	@Value("${file.upload.location}")
	private String uploadFolder;

	@Autowired
	public UserRepository userRepo;

	@Autowired
	public ProductRepository productRepo;

	@PostConstruct
	public void init() throws IOException {
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public void uploadImage(String email, MultipartFile image) throws IOException {
		User userObj = userRepo.findByUserEmail(email).orElseThrow(() -> new CustomException("Please register first"));
		String path = uploadFolder.concat(userObj.getUserEmail()+userObj.getId()+image.getOriginalFilename());
		writeByteArrayToFile(new File(path), image.getBytes());
		System.out.println(path);
		userObj.setImgPath(path);
	}

	@Override
	public byte[] serveImage(Long id) throws IOException {
		User userObj = userRepo.findById(id).orElseThrow(() -> new CustomException("Invalid user id !!!!!"));
		String path = userObj.getImgPath();
		return readFileToByteArray(new File(path));

	}

	@Override
	public void uploadProdImage(Long prodid, MultipartFile image1, MultipartFile image2) throws IOException {
		// TODO Auto-generated method stub
		Product prod = productRepo.findById(prodid).orElseThrow(() -> new CustomException("Invalid product id !!!!!"));
		String path1 = uploadFolder.concat(prod.getOwner().getUserEmail()+prod.getProductId().toString()+image1.getOriginalFilename());
		String path2 = uploadFolder.concat(prod.getOwner().getUserEmail()+prod.getProductId().toString()+image2.getOriginalFilename());
		writeByteArrayToFile(new File(path1), image1.getBytes());
		writeByteArrayToFile(new File(path2), image2.getBytes());
		prod.setImgPath1(path1);
		prod.setImgPath2(path2);
		
	}

	@Override
	public List<byte[]> serveProdImage(Long prodid) throws IOException {
		// TODO Auto-generated method stub
		Product prod = productRepo.findById(prodid).orElseThrow(() -> new CustomException("Invalid product id !!!!!"));
		String path1 = prod.getImgPath1();
		String path2 = prod.getImgPath2();
		List<byte[]> prodList = new ArrayList<>();
		prodList.add(readFileToByteArray(new File(path1)));
		prodList.add(readFileToByteArray(new File(path2)));
		return prodList;
	}
}
